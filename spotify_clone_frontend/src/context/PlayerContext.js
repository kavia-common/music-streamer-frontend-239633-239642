import React, { createContext, useContext, useMemo, useReducer } from "react";

const PlayerContext = createContext(null);

const initialState = {
  currentTrack: null,
  isPlaying: false,
  queue: [],
  queueIndex: -1,
  likedTrackIds: new Set(),
  volume: 0.8,
  repeatMode: "off", // "off" | "all" | "one"
  shuffle: false
};

function clamp01(n) {
  return Math.max(0, Math.min(1, n));
}

function normalizeSet(maybeSet) {
  return maybeSet instanceof Set ? maybeSet : new Set(Array.isArray(maybeSet) ? maybeSet : []);
}

function reducer(state, action) {
  switch (action.type) {
    case "PLAY_TRACK": {
      const { track, queue, startIndex } = action.payload;
      const nextQueue = Array.isArray(queue) ? queue : track ? [track] : [];
      const idx = typeof startIndex === "number" ? startIndex : 0;

      return {
        ...state,
        currentTrack: track ?? nextQueue[idx] ?? null,
        isPlaying: Boolean(track ?? nextQueue[idx]),
        queue: nextQueue,
        queueIndex: nextQueue.length ? Math.min(Math.max(idx, 0), nextQueue.length - 1) : -1
      };
    }

    case "TOGGLE_PLAY": {
      if (!state.currentTrack) return state;
      return { ...state, isPlaying: !state.isPlaying };
    }

    case "PAUSE": {
      return { ...state, isPlaying: false };
    }

    case "NEXT": {
      if (!state.queue.length) return state;
      const nextIndex = state.queueIndex + 1;

      if (nextIndex <= state.queue.length - 1) {
        return {
          ...state,
          queueIndex: nextIndex,
          currentTrack: state.queue[nextIndex],
          isPlaying: true
        };
      }

      // End of queue handling
      if (state.repeatMode === "all") {
        return {
          ...state,
          queueIndex: 0,
          currentTrack: state.queue[0],
          isPlaying: true
        };
      }

      return { ...state, isPlaying: false };
    }

    case "PREV": {
      if (!state.queue.length) return state;
      const prevIndex = state.queueIndex - 1;

      if (prevIndex >= 0) {
        return {
          ...state,
          queueIndex: prevIndex,
          currentTrack: state.queue[prevIndex],
          isPlaying: true
        };
      }

      return state;
    }

    case "SET_VOLUME": {
      return { ...state, volume: clamp01(action.payload.volume) };
    }

    case "TOGGLE_LIKE": {
      const liked = new Set(state.likedTrackIds);
      const id = action.payload.trackId;
      if (liked.has(id)) liked.delete(id);
      else liked.add(id);
      return { ...state, likedTrackIds: liked };
    }

    case "SET_REPEAT_MODE": {
      return { ...state, repeatMode: action.payload.repeatMode };
    }

    case "TOGGLE_SHUFFLE": {
      return { ...state, shuffle: !state.shuffle };
    }

    case "HYDRATE": {
      const next = action.payload.state ?? {};
      return {
        ...state,
        ...next,
        likedTrackIds: normalizeSet(next.likedTrackIds ?? state.likedTrackIds)
      };
    }

    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function PlayerProvider({ children }) {
  /** Provides playback/queue/liked state to the application. */
  const [state, dispatch] = useReducer(reducer, initialState);

  const api = useMemo(() => {
    return {
      state,
      dispatch,

      // Convenience actions
      playTrack: (track, queue) =>
        dispatch({ type: "PLAY_TRACK", payload: { track, queue, startIndex: 0 } }),

      playQueueAt: (queue, startIndex) =>
        dispatch({ type: "PLAY_TRACK", payload: { queue, startIndex } }),

      togglePlay: () => dispatch({ type: "TOGGLE_PLAY" }),
      next: () => dispatch({ type: "NEXT" }),
      prev: () => dispatch({ type: "PREV" }),
      setVolume: (volume) => dispatch({ type: "SET_VOLUME", payload: { volume } }),
      toggleLike: (trackId) => dispatch({ type: "TOGGLE_LIKE", payload: { trackId } }),
      setRepeatMode: (repeatMode) =>
        dispatch({ type: "SET_REPEAT_MODE", payload: { repeatMode } }),
      toggleShuffle: () => dispatch({ type: "TOGGLE_SHUFFLE" })
    };
  }, [state]);

  return <PlayerContext.Provider value={api}>{children}</PlayerContext.Provider>;
}

// PUBLIC_INTERFACE
export function usePlayer() {
  /** Hook to access PlayerContext. */
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
