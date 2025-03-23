import './bootstrap';
import { createApp } from 'vue';
import Pusher from 'pusher-js';
import Chat from '../src/components/pages/backend/pages/pages/all-pages/live-chat/live-chat/live-chat.vue'; // Import Chat.vue

window.Pusher = Pusher;

const app = createApp({
    components: {
        Chat,
    },
});

import chatBox from '../src/components/pages/backend/pages/pages/all-pages/live-chat/live-chat/chatBox.vue';

app.component('chat-form', chatBox);
app.component('chat', Chat);

const mountedApp = app.mount('#app'); 