import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_FAILED,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_PENDING,
} from "./constants";

import * as reducers from "./reducers";

describe("search robots", () => {
  const initialStateSearch = {
    searchField: "",
  };
  it("return the initial state", () => {
    expect(reducers.searchRobots(undefined, {})).toEqual({ searchField: "" });
  });

  it("change the search field", () => {
    expect(
      reducers.searchRobots(initialStateSearch, {
        type: "CHANGE_SEARCH_FIELD",
        payload: "abc",
      })
    ).toEqual({ searchField: "abc" });
  });
});

describe("request robots", () => {
  const initialState = {
    robots: [],
    isPending: false,
    error: "",
  };

  it("return the initial state", () => {
    expect(reducers.requestRobots(undefined, {})).toEqual(initialState);
  });

  it("should handle pending state", () => {
    expect(
      reducers.requestRobots(initialState, {
        type: REQUEST_ROBOTS_PENDING,
      })
    ).toEqual({
      ...initialState,
      isPending: true,
    });
  });

  it("should handle success state", () => {
    expect(
      reducers.requestRobots(initialState, {
        type: REQUEST_ROBOTS_SUCCESS,
        payload: [
          {
            id: "123",
            name: "shahriar",
            email: "shahriar@gmail.com",
          },
        ],
      })
    ).toEqual({
      ...initialState,
      isPending: false,
      robots: [
        {
          id: "123",
          name: "shahriar",
          email: "shahriar@gmail.com",
        },
      ],
    });
  });

  it("should handle error state", () => {
    expect(
      reducers.requestRobots(initialState, {
        type: REQUEST_ROBOTS_FAILED,
        payload: "Something went wrong!",
      })
    ).toEqual({
      ...initialState,
      isPending: false,
      error: "Something went wrong!",
    });
  });
});
