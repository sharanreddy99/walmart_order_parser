const reducer = (state, action) => {
  console.log(action);
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
  } else if (action.type == "CLEAR_TEMP_GROUP") {
    return { ...state, tempGroup: [], tempGroupString: "" };
  }

  // Managing Created Groups
  if (action.type == "ADD_GROUP") {
    let newGroupsList = [...state.groupsList];
    if (!state.groupsList.includes(action.payload)) {
      newGroupsList.push(action.payload);
      localStorage.setItem("groupNames", JSON.stringify(newGroupsList));
      return {
        ...state,
        groupsList: newGroupsList,
        groups: { ...state.groups, [action.payload]: [] },
      };
    }

    return state;
  } else if (action.type == "SET_DEFAULT_GROUPS") {
    return {
      ...state,
      groups: action.payload,
      groupsList: Object.keys(action.payload),
    };
  }

  // OnboardingData
  if (action.type == "SET_ONBOARDING_DATA") {
    return { ...state, onboardingData: action.payload };
  }

  // File Upload
  if (action.type == "SET_SELECTED_FILE") {
    return { ...state, selectedFile: action.payload };
  }

  // Order Details
  if (action.type == "SET_ORDER_DETAILS") {
    return { ...state, orderDetails: action.payload };
  }

  throw new Error("State Error");
};

const defaultState = {
  users: [],
  groups: {},
  groupsList: [],
  tempGroup: [],
  tempGroupString: "",
  selectedFile: null,
  orderDetails: { ordersArr: [] },
  onboardingData: {
    data: null,
    stepNumber: 0,
    isShown: false,
  },
};

export { reducer, defaultState };
