const singleReducer = (state, action) => {
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

  // RegularModal
  if (action.type == "SET_REGULAR_MODAL") {
    return { ...state, regularModal: action.payload };
  }

  // File Upload
  if (action.type == "SET_SELECTED_FILE") {
    return { ...state, selectedFile: action.payload };
  } else if (action.type == "IS_FILE_UPLOADED") {
    return { ...state, isFileUploaded: action.payload };
  }

  // Split Fetched
  if (action.type == "IS_SPLIT_FETCHED") {
    return { ...state, isSplitFetched: action.payload };
  }

  // Order Details
  if (action.type == "SET_ORDER_DETAILS") {
    return {
      ...state,
      orderDetails: action.payload,
    };
  } else if (action.type == "SET_ORDERS_CHANGE_STATUS") {
    return { ...state, isOrderSplitChanged: action.payload };
  }

  throw new Error("State Error");
};

const reducer = (state, actionArr) => {
  let newState = { ...state };
  if (Array.isArray(actionArr)) {
    for (let i = 0; i < actionArr.length; i++) {
      newState = singleReducer(newState, actionArr[i]);
    }
  } else {
    newState = singleReducer(newState, actionArr);
  }

  return newState;
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
    data: {},
    stepNumber: 0,
    isShown: false,
  },
  isOrderSplitChanged: false,
  isFileUploaded: false,
  isSplitFetched: false,
  regularModal: {
    title: "",
    body: "",
    isShown: false,
  },
};

export { reducer, defaultState };
