const reducer = (state, action) => {
  // Users
  if (action.type == "ADD_USER") {
    const newUser = action.payload;
    let users = [
      ...state.users.filter((user) => user.userID !== newUser.userID),
      newUser,
    ];
    localStorage.setItem("users", JSON.stringify(users));
    return { ...state, users: users };
  } else if (action.type == "SET_DEFAULT_USERS") {
    return { ...state, users: action.payload };
  } else if (action.type == "REMOVE_USER") {
    const newUser = action.payload;
    let users = state.users.filter((user) => user.userID !== newUser.userID);
    localStorage.setItem("users", JSON.stringify(users));
    return { ...state, users: users };
  }

  // Managing User Groups
  if (action.type == "TOGGLE_USER_FROM_GROUP") {
    const newUser = action.payload;
    let tempGroup = [];
    if (state.tempGroup.includes(newUser)) {
      tempGroup = state.tempGroup.filter((group) => group !== newUser);
    } else {
      tempGroup = [...state.tempGroup, newUser];
    }

    tempGroup.sort();

    return {
      ...state,
      tempGroup: tempGroup,
      tempGroupString: tempGroup.join(","),
    };
  } else if (action.type == "CLEAR_USER_GROUP") {
    return { ...state, tempGroup: [], tempGroupString: "" };
  }

  // Managing Created Groups
  if (action.type == "ADD_GROUP") {
    let newGroupNames = [...state.groups];
    if (!state.groups.includes(action.payload)) {
      newGroupNames.push(action.payload);
      localStorage.setItem("groupNames", JSON.stringify(newGroupNames));
      return { ...state, groups: newGroupNames };
    }

    return state;
  } else if (action.type == "SET_DEFAULT_GROUPS") {
    return { ...state, groups: action.payload };
  }

  // OnboardingData

  throw new Error("State Error");
};

const defaultState = {
  users: [],
  groups: [],
  onboardingData: {
    data: null,
    stepNumber: 0,
    isShown: false,
  },
  tempGroup: [],
  tempGroupString: "",
  groupNames: [],
};

export { reducer, defaultState };
