import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import LoadingScreen from '../components/LoadingScreen';

export default function Chat() {
    const [loading, setLoading] = useState(true)
    const inboxEl = useRef();
    const [talkLoaded, markTalkLoaded] = useState(false);
    Talk.ready.then(() => markTalkLoaded(true))

    useEffect(() => {
        // setLoading(false)
        if (talkLoaded) {
            // Safe to use the SDK here
            const currentUser = new Talk.User({
                id: '1',
                name: 'Galaxy Pet Shop',
                email: 'galaxy@mail.com',
                photoUrl: 'https://i.guim.co.uk/img/media/c5e73ed8e8325d7e79babf8f1ebbd9adc0d95409/2_5_1754_1053/master/1754.jpg?width=620&quality=45&dpr=2&s=none',
                welcomeMessage: `Hi, welcome to ${"Galaxy Pet Shop"}! How can we help you today?`,
                role: 'default',
            });

            const otherUser = new Talk.User(
                {
                    id: "2",
                    name: "Alice",
                    email: "alice@example.com",
                    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
                    welcomeMessage: "Hey there! How are you? :-)",
                    role: "default",
                }
            );

            const session = new Talk.Session({
                appId: 't0KJ4uWG',
                me: currentUser,
            });

            const conversationId = Talk.oneOnOneId(currentUser, otherUser);
            const conversation = session.getOrCreateConversation(conversationId);
            conversation.setParticipant(currentUser);
            conversation.setParticipant(otherUser);

            // const chatbox = session.createChatbox();
            // chatbox.select(conversation);
            // chatbox.mount(chatboxEl.current);

            const inbox = session.createInbox();
            inbox.mount(inboxEl.current);
            return () => session.destroy();
        }

    }, [talkLoaded]);

    const loadingScreen = () => {
        return <LoadingScreen />;
    }

    return (
        <>
            <div className=' w-full h-full flex justify-center'>
                {/* {loading ? loadingScreen() : ""} */}
                <div className=' w-2/3 h-full flex bg-[#eafdfc] p-4 rounded-md shadow-md'>
                    <div ref={inboxEl} className=" w-full" />
                    {/* <div ref={chatboxEl} className=" w-full" /> */}
                </div>
            </div>
        </>
    )
}