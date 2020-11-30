// onClickOpen =>
// if (openMessages.includes(messageId)) {
// removefromopenmessage
// else
// add to openmessages
// setOpenMessages([...openMessages, idOfTheMessageIClickedON]

// in render
// instead of storedMessage.map -> messages.map
// instead of checking x.messageOpen -> check openMessages.includes(message.id)

const [openMessages, setOpenMessages] = useState([]);
const [replyMessages, setReplyMessages] = useState([]);

const openMessage = (messageId) => {
if (openMessages.includes(messageId)) {
const updatedMessages.filter(x => x.id !=== messageId)
setOpenMessages(updatedMessages)

} else {
setOpenMessages(...openMessages, messageId);
}
};

const replyMessage = (messageId) => {
if (!replyMessagesInput.includes(messageId)) {
setReplyMessagesInput(...replyMessagesInput, messageId);
} else {
return;
}
};

// const openMessage = (messageId) => () => {
// const alteredMessages = storedMessages.map((x) =>
// x.id === messageId ? { ...x, messageOpen: !x.messageOpen } : x
// );
// setStoredMessages(alteredMessages);
// };
