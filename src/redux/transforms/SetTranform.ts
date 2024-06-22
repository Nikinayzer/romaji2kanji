import { createTransform } from 'redux-persist';

// Custom transform to handle Set serialization
const SetTransform = createTransform(
  // Transform state on its way to being serialized and persisted.
  (inboundState: { mySet: any }, key) => {
    if (!inboundState) return inboundState;
    return {
      ...inboundState,
      mySet: Array.isArray(inboundState.mySet) ? inboundState.mySet : [...inboundState.mySet],
    };
  },
  // Transform state being rehydrated
  (outboundState: { mySet: any }, key) => {
    if (!outboundState) return outboundState;
    return {
      ...outboundState,
      mySet: new Set(outboundState.mySet),
    };
  },
  // Define which reducers this transform gets called for.
  { whitelist: ['session'] }
);

export default SetTransform;