import { ActionCreator, ActionReducer, ActionType, Action } from './models';

// Return type of the `on` fn.
export interface On<S> {
  reducer: ActionReducer<S>;
  types: string[];
}

// Specialized Reducer that is aware of the Action type it needs to handle
export interface OnReducer<S, C extends ActionCreator[]> {
  (state: S, action: ActionType<C[number]>): S;
}

export function on<C1 extends ActionCreator, S>(
  creator1: C1,
  reducer: OnReducer<S, [C1]>
): On<S>;
export function on<C1 extends ActionCreator, C2 extends ActionCreator, S>(
  creator1: C1,
  creator2: C2,
  reducer: OnReducer<S, [C1, C2]>
): On<S>;
export function on<
  C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  S
>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  reducer: OnReducer<S, [C1, C2, C3]>
): On<S>;
export function on<
  C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  C4 extends ActionCreator,
  S
>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  creator4: C4,
  reducer: OnReducer<S, [C1, C2, C3, C4]>
): On<S>;
export function on<
  C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  C4 extends ActionCreator,
  C5 extends ActionCreator,
  S
>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  creator4: C4,
  creator5: C5,
  reducer: OnReducer<S, [C1, C2, C3, C4, C5]>
): On<S>;
export function on<
  C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  C4 extends ActionCreator,
  C5 extends ActionCreator,
  C6 extends ActionCreator,
  S
>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  creator4: C4,
  creator5: C5,
  creator6: C6,
  reducer: OnReducer<S, [C1, C2, C3, C4, C5, C6]>
): On<S>;
export function on<
  C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  C4 extends ActionCreator,
  C5 extends ActionCreator,
  C6 extends ActionCreator,
  C7 extends ActionCreator,
  S
>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  creator4: C4,
  creator5: C5,
  creator6: C6,
  creator7: C7,
  reducer: OnReducer<S, [C1, C2, C3, C4, C5, C6, C7]>
): On<S>;
export function on<
  C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  C4 extends ActionCreator,
  C5 extends ActionCreator,
  C6 extends ActionCreator,
  C7 extends ActionCreator,
  C8 extends ActionCreator,
  S
>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  creator4: C4,
  creator5: C5,
  creator6: C6,
  creator7: C7,
  creator8: C8,
  reducer: OnReducer<S, [C1, C2, C3, C4, C5, C6, C7, C8]>
): On<S>;
export function on<
  C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  C4 extends ActionCreator,
  C5 extends ActionCreator,
  C6 extends ActionCreator,
  C7 extends ActionCreator,
  C8 extends ActionCreator,
  C9 extends ActionCreator,
  S
>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  creator4: C4,
  creator5: C5,
  creator6: C6,
  creator7: C7,
  creator8: C8,
  creator9: C9,
  reducer: OnReducer<S, [C1, C2, C3, C4, C5, C6, C7, C8, C9]>
): On<S>;
export function on<
  C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  C4 extends ActionCreator,
  C5 extends ActionCreator,
  C6 extends ActionCreator,
  C7 extends ActionCreator,
  C8 extends ActionCreator,
  C9 extends ActionCreator,
  C10 extends ActionCreator,
  S
>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  creator4: C4,
  creator5: C5,
  creator6: C6,
  creator7: C7,
  creator8: C8,
  creator9: C9,
  creator10: C10,
  reducer: OnReducer<S, [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10]>
): On<S>;
export function on<S>(
  creator: ActionCreator,
  ...rest: (ActionCreator | OnReducer<S, [ActionCreator]>)[]
): On<S>;
/**
 * @description
 * Associates actions with a given state change function.
 * A state change function must be provided as the last parameter.
 *
 * @param args `ActionCreator`'s followed by a state change function.
 *
 * **To maintain type-safety**: pass 10 or less `ActionCreator`'s.
 * @returns an association of action types with a state change function.
 */
export function on(
  ...args: (ActionCreator | Function)[]
): { reducer: Function; types: string[] } {
  const reducer = args.pop() as Function;
  const types = args.reduce(
    (result, creator) => [...result, (creator as ActionCreator).type],
    [] as string[]
  );
  return { reducer, types };
}

/**
 * @description
 * Creates a reducer function to handle state transitions.
 *
 * Reducer creators reduce the explicitness of reducer functions with switch statements.
 *
 * @param initialState Provides a state value if the current state is `undefined`, as it is initially.
 * @param ons Associations between actions and state changes.
 * @returns A reducer function.
 *
 * @usageNotes
 *
 * - Must be used with `ActionCreator`'s (returned by `createAction`).  Cannot be used with class-based action creators.
 * - An action type should only be associated with at most one state change function, similar to switch statements.
 *   - In the case this is violated, the latest defined associated will be used (the latest `on` function passed).
 * - The returned `ActionReducer` should additionally be returned from an exported `reducer` function.
 * This is because [function calls are not supported](https://angular.io/guide/aot-compiler#function-calls-are-not-supported) by the AOT compiler.
 *
 * **Declaring a reducer creator with an exported reducer function**
 *
 * ```ts
 * const featureReducer = createReducer(
 *   initialState,
 *   on(
 *     featureActions.actionOne,
 *     featureActions.actionTwo,
 *     (state, { updatedValue }) => ({ ...state, prop: updatedValue })
 *   ),
 *   on(featureActions.actionThree, () => initialState);
 * );
 *
 * export function reducer(state: State | undefined, action: Action) {
 *   return featureReducer(state, action);
 * }
 * ```
 */
export function createReducer<S>(
  initialState: S,
  ...ons: On<S>[]
): ActionReducer<S> {
  const map = new Map<string, ActionReducer<S>>();
  for (let on of ons) {
    for (let type of on.types) {
      map.set(type, on.reducer);
    }
  }

  return function(state: S = initialState, action: Action): S {
    const reducer = map.get(action.type);
    return reducer ? reducer(state, action) : state;
  };
}
