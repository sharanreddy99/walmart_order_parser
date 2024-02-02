import SampleReceiptUrl from "../assets/SampleReceipt.pdf";

const onboardingConfig = [
  {
    title: "Upload Walmart Online Order Receipt",
    body:
      "<ul>" +
      "<li>Download the Walmart Order Receipt for the required order from the 'Purchase History' section in the Walmart App. For testing our application you can also use the sample receipt.</li><br/>" +
      `<li><a href='${SampleReceiptUrl}' download>Sample Receipt</a></li><br/>` +
      "<li>Once you have downloaded the file, upload it using the <b>Upload Button</b></li><br/>" +
      "</ul>",
  },
  {
    title: "Add Groups To Split The Items Among Users",
    body:
      "<ul>" +
      "<li>Create a group name to drag and drop the order items to a specified group or person.</li><br/>" +
      "<li>If the group consists of more than one person who is part of multiple other groups, simply create a comma separated group name which includes the list of all the participants of the order. <br/>Eg: <b>user1,user2,user3,user4</b> and <b>user1,user2</b> and <b>user2,user4</b> and <b>user1,user3,user4</b></li><br/>" +
      "<li>If the comma separated format is utilized, the application will segregate all the individual items for a specific person from all the groups and generate the individual bills</li><br/>" +
      "</ul>",
  },
  {
    title: "Assigning Items to Groups",
    body:
      "<ul>" +
      "<li>Now assign individual items to each to group in order to aggregate the incurred cost for each participant in the order.</li><br/>" +
      "<li>You can simply drag the item from the orders and drop it in any of the groups created.</li><br/>" +
      "<li>In case any item is ordered in multiple quantities, you can also split the individual item based on the quantities among the required participants.</li><br/>" +
      "<li>To simplify the item assignment process, you can also make use of the textbox to assign multiple items to a group. For example: you can type <b>potatoes;;tomatoes ordered by user1,user2</b> to assign those items to the group. The item names can be a substring and need not be the complete item name.</li><br/>" +
      "</ul>",
  },
  {
    title: "View Summary Of The Order",
    body:
      "<ul>" +
      "<li>Once you have assigned all the items to respective groups, you can see the overall split information for the given order.</li><br/>" +
      "<li>Each of the cards has the following information" +
      "<ol>" +
      "<li><b>Individual Shares: </b> This section shows individual share information if comma separated group names are used.</li><br/>" +
      "</ol>" +
      "</li><br/>" +
      "</ul>",
  },
];

export const getCurrentOnboardingConfig = (idx) => {
  if (onboardingConfig.length == idx) {
    return null;
  }

  return onboardingConfig[idx];
};

export const setCurrentOnboardingConfig = (
  currState,
  setState,
  isForce = false
) => {
  if (isForce) {
    localStorage.setItem("onboardingStep", "" + currState);
    setState({
      stepNumber: currState,
      data: getCurrentOnboardingConfig(currState),
      isShown: true,
    });
    return;
  }

  if (
    localStorage.getItem("onboardingStep") == null ||
    parseInt(localStorage.getItem("onboardingStep")) <= currState - 1
  ) {
    localStorage.setItem("onboardingStep", "" + currState);
    setState({
      stepNumber: currState,
      data: getCurrentOnboardingConfig(currState),
      isShown: true,
    });
  }
};
