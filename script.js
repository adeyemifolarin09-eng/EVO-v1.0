// EVO WhatsApp Clone - Complete Functionality
// ============================================

// App State
let currentUser = null;
let users = JSON.parse(localStorage.getItem('evo_users')) || [];
let messages = JSON.parse(localStorage.getItem('evo_messages')) || [];
let calls = JSON.parse(localStorage.getItem('evo_calls')) || [];
let statuses = JSON.parse(localStorage.getItem('evo_statuses')) || [];
let blockedUsers = JSON.parse(localStorage.getItem('evo_blocked')) || [];
let archivedChats = JSON.parse(localStorage.getItem('evo_archived')) || [];
let userSettings = JSON.parse(localStorage.getItem('evo_settings')) || {};
let currentChatPartner = null;
let currentStatusIndex = 0;
let currentUserStatuses = [];
let statusTimer = null;
let typingTimer = null;
let emojiCategories = {
    recent: [],
    smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠'],
    people: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦵', '🦿', '🦶', '👣', '👀', '🫀', '🫁', '🧠', '🦷', '🦴', '👤', '👥', '🫂', '👶', '🧒', '👦', '👧', '🧑', '👨', '👩', '🧔', '👨‍🦰', '👩‍🦰', '👨‍🦱', '👩‍🦱', '👨‍🦲', '👩‍🦲', '👨‍🦳', '👩‍🦳', '🦰', '🦱', '🦲', '🦳', '👵', '🧓', '👴', '👲', '👳‍♂️', '👳‍♀️', '🧕', '🧔‍♂️', '🧔‍♀️', '👮‍♂️', '👮‍♀️', '🕵️‍♂️', '🕵️‍♀️', '💂‍♂️', '💂‍♀️', '👷‍♂️', '👷‍♀️'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐸', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🦣', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓', '🦃', '🦤', '🦚', '🦜', '🦢', '🦩', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦫', '🦦', '🦥', '🐁', '🐀', '🐿️', '🦔'],
    food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🥗', '🥘', '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯'],
    activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎯', '🏏', '🏑', '🏒', '🥍', '🏓', '🏸', '🥊', '🥋', '🥅', '⛳', '🏹', '🎣', '🤿', '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️', '🤼', '🤸', '🤺', '⛸️', '🥌', '🏄', '🏊', '🤽', '🚣', '🧗', '🚵', '🚴', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🏵️', '🎗️', '🎫', '🎟️', '🎪', '🤹', '🎭', '🩰', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🪕', '🎻', '🎲', '♟️', '🎯', '🎳', '🎮', '🎰'],
    travel: ['🌍', '🌎', '🌏', '🌐', '🗺️', '🧭', '🏔️', '⛰️', '🌋', '🗻', '🏕️', '🏖️', '🏜️', '🏝️', '🏞️', '🏟️', '🏛️', '🏗️', '🧱', '🪨', '🪵', '🛖', '🏘️', '🏚️', '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏯', '🏰', '💒', '🗼', '🗽', '⛪', '🕌', '🛕', '🕍', '⛩️', '🕋', '⛲', '⛺', '🌁', '🌃', '🏙️', '🌄', '🌅', '🌆', '🌇', '🌉', '♨️', '🎠', '🎡', '🎢', '🚂', '🚃', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉', '🚊', '🚝', '🚞', '🚋', '🚌', '🚍', '🚎', '🚐', '🚑', '🚒', '🚓', '🚔', '🚕', '🚖', '🚗', '🚘', '🚙', '🛻', '🚚', '🚛', '🚜', '🏎️', '🏍️', '🛵', '🦽', '🦼', '🛺', '🚲', '🛴', '🛹', '🛼', '🚏', '🛣️', '🛤️', '⛽', '🚨', '🚥', '🚦', '🛑', '🚧', '⚓', '⛵', '🛶', '🚤', '🛳️', '⛴️', '🛥️', '🚢', '✈️', '🛩️', '🛫', '🛬', '🪂', '💺', '🚁', '🚟', '🚠', '🚡', '🛰️', '🚀', '🛸', '🛎️', '🧳'],
    objects: ['⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⌛', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯️', '🧯', '🛢️', '💸', '💵', '💴', '💶', '💷', '🪙', '💰', '💳', '💎', '⚖️', '🧰', '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🔩', '⚙️', '🧱', '⛓️', '🧲', '🔫', '💣', '🧨', '🪓', '🔪', '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳️', '🩹', '🩺', '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡️', '🧹', '🧺', '🧻', '🚽', '🚰', '🚿', '🛁', '🛀', '🧼', '🪒', '🧽', '🧴', '🪥', '🪮', '🧵', '🧶', '🪡', '🪢', '🧥', '👚', '👕', '👖', '🩲', '🩳', '👔', '👗', '👙', '🩱', '👘', '🥻', '🩴', '👠', '👡', '👢', '👞', '👟', '🥾', '🥿', '🧦', '🧤', '🧣', '🎩', '🧢', '👒', '🎓', '⛑️', '🪖', '📿', '💄', '💍', '💼', '🩸']
};

// Initialize with default users
function initializeApp() {
    if (users.length === 0) {
        const defaultUsers = [
            {
                id: '1',
                fullName: 'John Smith',
                email: 'john@evo.com',
                phone: '+1 234-567-8901',
                password: 'password123',
                about: 'Hey there! I am using EVO',
                profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
                status: 'online',
                lastSeen: new Date().toISOString(),
                contacts: ['2', '3']
            },
            {
                id: '2',
                fullName: 'Emma Watson',
                email: 'emma@evo.com',
                phone: '+1 234-567-8902',
                password: 'password123',
                about: 'Available',
                profilePic: 'https://randomuser.me/api/portraits/women/1.jpg',
                status: 'offline',
                lastSeen: new Date(Date.now() - 3600000).toISOString(),
                contacts: ['1', '3']
            },
            {
                id: '3',
                fullName: 'Michael Brown',
                email: 'michael@evo.com',
                phone: '+1 234-567-8903',
                password: 'password123',
                about: 'Busy right now',
                profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
                status: 'online',
                lastSeen: new Date().toISOString(),
                contacts: ['1', '2']
            }
        ];
        users.push(...defaultUsers);
        saveUsers();

        // Add some sample messages
        const sampleMessages = [
            {
                id: generateId(),
                senderId: '2',
                receiverId: '1',
                content: 'Hey John, how are you?',
                timestamp: new Date(Date.now() - 86400000).toISOString(),
                read: true,
                status: 'read'
            },
            {
                id: generateId(),
                senderId: '1',
                receiverId: '2',
                content: 'Hi Emma! I\'m good, thanks! How about you?',
                timestamp: new Date(Date.now() - 86000000).toISOString(),
                read: true,
                status: 'read'
            },
            {
                id: generateId(),
                senderId: '2',
                receiverId: '1',
                content: 'Doing great! Want to catch up later?',
                timestamp: new Date(Date.now() - 85000000).toISOString(),
                read: false,
                status: 'sent'
            },
            {
                id: generateId(),
                senderId: '3',
                receiverId: '1',
                content: 'Hey John, check out this new feature!',
                timestamp: new Date(Date.now() - 7200000).toISOString(),
                read: true,
                status: 'read'
            }
        ];
        messages.push(...sampleMessages);
        saveMessages();

        // Add sample statuses
        const sampleStatuses = [
            {
                id: generateId(),
                userId: '2',
                type: 'text',
                content: 'Enjoying the weekend! 🌞',
                color: '#ff6b6b',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                views: ['1']
            },
            {
                id: generateId(),
                userId: '3',
                type: 'image',
                content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
                timestamp: new Date(Date.now() - 7200000).toISOString(),
                views: ['1', '2']
            }
        ];
        statuses.push(...sampleStatuses);
        saveStatuses();

        // Add sample calls
        const sampleCalls = [
            {
                id: generateId(),
                type: 'audio',
                with: '2',
                direction: 'incoming',
                status: 'answered',
                timestamp: new Date(Date.now() - 172800000).toISOString(),
                duration: 15
            },
            {
                id: generateId(),
                type: 'video',
                with: '3',
                direction: 'outgoing',
                status: 'missed',
                timestamp: new Date(Date.now() - 86400000).toISOString()
            }
        ];
        calls.push(...sampleCalls);
        saveCalls();
    }

    // Initialize user settings if not exists
    if (Object.keys(userSettings).length === 0) {
        userSettings = {
            privacy: {
                lastSeen: 'everyone',
                profilePhoto: 'everyone',
                about: 'everyone',
                status: 'contacts',
                readReceipts: true,
                groupPrivacy: 'everyone',
                disappearingMessages: 'off'
            },
            chats: {
                enterSends: true,
                mediaVisibility: true,
                fontSize: 'medium',
                wallpaper: 'default',
                keepArchived: false
            },
            notifications: {
                messages: true,
                groups: true,
                calls: true,
                tone: 'default',
                vibrate: 'default',
                popup: false,
                light: true,
                groupTone: 'default',
                callTone: 'default',
                callVibrate: true
            }
        };
        saveSettings();
    }
}

// Call initialization
initializeApp();

// Utility Functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function saveUsers() {
    localStorage.setItem('evo_users', JSON.stringify(users));
}

function saveMessages() {
    localStorage.setItem('evo_messages', JSON.stringify(messages));
}

function saveCalls() {
    localStorage.setItem('evo_calls', JSON.stringify(calls));
}

function saveStatuses() {
    localStorage.setItem('evo_statuses', JSON.stringify(statuses));
}

function saveBlocked() {
    localStorage.setItem('evo_blocked', JSON.stringify(blockedUsers));
}

function saveArchived() {
    localStorage.setItem('evo_archived', JSON.stringify(archivedChats));
}

function saveSettings() {
    localStorage.setItem('evo_settings', JSON.stringify(userSettings));
}

function showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00a884' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        z-index: 10000;
        animation: slideUp 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function showConfirm(message, onConfirm, onCancel) {
    const confirmDialog = document.createElement('div');
    confirmDialog.className = 'confirm-dialog';
    confirmDialog.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        animation: fadeIn 0.3s ease;
    `;
    confirmDialog.innerHTML = `
        <div style="background: white; border-radius: 20px; width: 300px; padding: 20px; text-align: center;">
            <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #f44336; margin-bottom: 15px;"></i>
            <h3 style="margin-bottom: 10px;">Confirm</h3>
            <p style="margin-bottom: 20px; color: #666;">${message}</p>
            <div style="display: flex; gap: 10px;">
                <button onclick="this.parentElement.parentElement.parentElement.remove(); ${onCancel ? onCancel : ''}" 
                        style="flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 10px; background: white; cursor: pointer;">Cancel</button>
                <button onclick="this.parentElement.parentElement.parentElement.remove(); ${onConfirm}" 
                        style="flex: 1; padding: 12px; background: #f44336; color: white; border: none; border-radius: 10px; cursor: pointer;">Confirm</button>
            </div>
        </div>
    `;
    document.body.appendChild(confirmDialog);
}

// Auth Functions
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.remove('active');
    
    if (tab === 'login') {
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.getElementById('registerForm').classList.add('active');
    }
}

function triggerFileUpload() {
    document.getElementById('regProfilePic').click();
}

function previewProfilePic(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePreview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('regFullName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const profilePicFile = document.getElementById('regProfilePic').files[0];
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters!', 'error');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showToast('Email already registered!', 'error');
        return;
    }
    
    if (users.find(u => u.phone === phone)) {
        showToast('Phone number already registered!', 'error');
        return;
    }
    
    const newUser = {
        id: generateId(),
        fullName,
        email,
        phone,
        password,
        about: 'Hey there! I am using EVO',
        profilePic: profilePicFile ? URL.createObjectURL(profilePicFile) : 'https://via.placeholder.com/150',
        status: 'offline',
        lastSeen: new Date().toISOString(),
        contacts: []
    };
    
    users.push(newUser);
    saveUsers();
    
    showToast('Registration successful! Please login.');
    switchAuthTab('login');
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        currentUser.status = 'online';
        currentUser.lastSeen = new Date().toISOString();
        saveUsers();
        
        if (rememberMe) {
            localStorage.setItem('evo_remembered_user', user.id);
        }
        
        setTimeout(() => {
            document.getElementById('splashScreen').style.display = 'none';
        }, 1500);
        
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('mainContainer').style.display = 'flex';
        
        updateUserInfo();
        loadChats();
        loadStatuses();
        loadCalls();
        updateArchiveCount();
        loadSettings();
        
        showToast(`Welcome back, ${currentUser.fullName}!`);
    } else {
        showToast('Invalid email or password!', 'error');
    }
}

function showForgotPassword() {
    const email = prompt('Enter your email address:');
    if (email) {
        const user = users.find(u => u.email === email);
        if (user) {
            showToast(`Password reset link sent to ${email}`);
        } else {
            showToast('Email not found!', 'error');
        }
    }
}

function logout() {
    showConfirm('Are you sure you want to logout?', 
        'logoutConfirmed()',
        ''
    );
}

function logoutConfirmed() {
    if (currentUser) {
        currentUser.status = 'offline';
        currentUser.lastSeen = new Date().toISOString();
        saveUsers();
    }
    
    localStorage.removeItem('evo_remembered_user');
    currentUser = null;
    document.getElementById('authContainer').style.display = 'flex';
    document.getElementById('mainContainer').style.display = 'none';
    closeAllSheets();
    switchMainTab('chats');
}

// Tab Switching
function switchMainTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    document.getElementById('chatsView').classList.remove('active');
    document.getElementById('statusView').classList.remove('active');
    document.getElementById('callsView').classList.remove('active');
    document.getElementById('settingsView').classList.remove('active');
    
    document.getElementById(`${tab}View`).classList.add('active');
    
    if (tab === 'settings') {
        updateSettingsInfo();
    }
}

// Update User Info
function updateUserInfo() {
    document.getElementById('myStatusPic').src = currentUser.profilePic;
    document.getElementById('settingsProfilePic').src = currentUser.profilePic;
    document.getElementById('settingsProfileName').textContent = currentUser.fullName;
    document.getElementById('settingsProfileAbout').textContent = currentUser.about || 'Hey there! I am using EVO';
    
    const myStatus = statuses.filter(s => s.userId === currentUser.id).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
    if (myStatus) {
        document.getElementById('myStatusText').textContent = 'Tap to view status';
    } else {
        document.getElementById('myStatusText').textContent = 'Tap to add status update';
    }
}

// Chat Functions
function loadChats() {
    const chatsList = document.getElementById('chatsList');
    
    // Get all contacts who have exchanged messages
    const chatPartners = new Set();
    messages.forEach(m => {
        if (m.senderId === currentUser.id && !blockedUsers.includes(m.receiverId)) chatPartners.add(m.receiverId);
        if (m.receiverId === currentUser.id && !blockedUsers.includes(m.senderId)) chatPartners.add(m.senderId);
    });
    
    // Add contacts from user's contact list
    currentUser.contacts?.forEach(id => {
        if (!blockedUsers.includes(id)) chatPartners.add(id);
    });
    
    const contacts = Array.from(chatPartners)
        .map(id => users.find(u => u.id === id))
        .filter(u => u);
    
    if (contacts.length === 0) {
        chatsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-comment" style="font-size: 48px; margin-bottom: 15px; color: #ddd;"></i>
                <h3>No chats yet</h3>
                <p>Start a conversation by tapping the new chat button</p>
            </div>
        `;
        return;
    }
    
    // Separate archived and non-archived chats
    const nonArchived = contacts.filter(c => !archivedChats.includes(c.id));
    const archived = contacts.filter(c => archivedChats.includes(c.id));
    
    // Sort by last message time
    const sortByLastMessage = (a, b) => {
        const aLastMsg = messages
            .filter(m => (m.senderId === currentUser.id && m.receiverId === a.id) || 
                        (m.senderId === a.id && m.receiverId === currentUser.id))
            .sort((x, y) => new Date(y.timestamp) - new Date(x.timestamp))[0];
        
        const bLastMsg = messages
            .filter(m => (m.senderId === currentUser.id && m.receiverId === b.id) || 
                        (m.senderId === b.id && m.receiverId === currentUser.id))
            .sort((x, y) => new Date(y.timestamp) - new Date(x.timestamp))[0];
        
        return new Date(bLastMsg?.timestamp || 0) - new Date(aLastMsg?.timestamp || 0);
    };
    
    nonArchived.sort(sortByLastMessage);
    archived.sort(sortByLastMessage);
    
    let html = '';
    
    // Show archived section if there are archived chats
    if (archived.length > 0) {
        html += `
            <div class="archive-section" onclick="showArchivedChats()">
                <i class="fas fa-archive"></i>
                <span>Archived</span>
                <span class="archive-count">${archived.length}</span>
            </div>
        `;
    }
    
    // Show non-archived chats
    nonArchived.forEach(contact => {
        html += renderChatItem(contact);
    });
    
    chatsList.innerHTML = html;
}

function renderChatItem(contact) {
    const lastMsg = messages
        .filter(m => (m.senderId === currentUser.id && m.receiverId === contact.id) || 
                    (m.senderId === contact.id && m.receiverId === currentUser.id))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
    
    const unreadCount = messages.filter(m => 
        m.senderId === contact.id && m.receiverId === currentUser.id && !m.read
    ).length;
    
    const isTyping = contact.isTyping || false;
    
    return `
        <div class="chat-item" onclick="openChat('${contact.id}', '${contact.fullName.replace(/'/g, "\\'")}', '${contact.profilePic}')"
             oncontextmenu="showChatContextMenu(event, '${contact.id}')">
            <div class="chat-item-avatar">
                <img src="${contact.profilePic}" alt="${contact.fullName}">
                <span class="online-indicator ${contact.status === 'online' ? 'online' : ''}"></span>
            </div>
            <div class="chat-item-info">
                <div class="chat-item-header">
                    <span class="chat-item-name">${contact.fullName}</span>
                    <span class="chat-item-time">${lastMsg ? formatTime(lastMsg.timestamp) : ''}</span>
                </div>
                <div class="chat-item-last">
                    ${isTyping ? 
                        '<span class="typing-indicator">typing...</span>' : 
                        (lastMsg ? 
                            (lastMsg.senderId === currentUser.id ? '<i class="fas fa-check-double" style="color: #4fc3f7; margin-right: 4px;"></i>' : '') + 
                            lastMsg.content.substring(0, 30) + (lastMsg.content.length > 30 ? '...' : '') 
                            : 'No messages yet')}
                </div>
            </div>
            ${unreadCount > 0 ? `<div class="unread-badge">${unreadCount}</div>` : ''}
        </div>
    `;
}

function showChatContextMenu(event, userId) {
    event.preventDefault();
    const user = users.find(u => u.id === userId);
    
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.cssText = `
        position: fixed;
        top: ${event.clientY}px;
        left: ${event.clientX}px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        min-width: 200px;
    `;
    
    menu.innerHTML = `
        <div class="context-menu-item" onclick="archiveChat('${userId}')">
            <i class="fas fa-archive"></i>
            <span>Archive chat</span>
        </div>
        <div class="context-menu-item" onclick="markAsRead('${userId}')">
            <i class="fas fa-check-double"></i>
            <span>Mark as read</span>
        </div>
        <div class="context-menu-item" onclick="pinChat('${userId}')">
            <i class="fas fa-thumbtack"></i>
            <span>Pin chat</span>
        </div>
        <div class="context-menu-item" onclick="muteChat('${userId}')">
            <i class="fas fa-bell-slash"></i>
            <span>Mute notifications</span>
        </div>
        <div class="context-menu-item" onclick="deleteChat('${userId}')" style="color: #f44336;">
            <i class="fas fa-trash"></i>
            <span>Delete chat</span>
        </div>
    `;
    
    document.body.appendChild(menu);
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }, { once: true });
    }, 100);
}

function archiveChat(userId) {
    if (!archivedChats.includes(userId)) {
        archivedChats.push(userId);
        saveArchived();
        loadChats();
        updateArchiveCount();
        showToast('Chat archived');
    }
}

function markAsRead(userId) {
    messages.forEach(m => {
        if (m.senderId === userId && m.receiverId === currentUser.id) {
            m.read = true;
        }
    });
    saveMessages();
    loadChats();
}

function pinChat(userId) {
    showToast('Pin feature coming soon!');
}

function muteChat(userId) {
    showToast('Mute feature coming soon!');
}

function deleteChat(userId) {
    showConfirm('Delete this chat? This action cannot be undone.',
        `deleteChatConfirmed('${userId}')`,
        ''
    );
}

function deleteChatConfirmed(userId) {
    messages = messages.filter(m => 
        !(m.senderId === currentUser.id && m.receiverId === userId) &&
        !(m.senderId === userId && m.receiverId === currentUser.id)
    );
    saveMessages();
    
    if (archivedChats.includes(userId)) {
        archivedChats = archivedChats.filter(id => id !== userId);
        saveArchived();
    }
    
    loadChats();
    showToast('Chat deleted');
}

function showArchivedChats() {
    const archivedContacts = archivedChats
        .map(id => users.find(u => u.id === id))
        .filter(u => u);
    
    if (archivedContacts.length === 0) {
        showToast('No archived chats');
        return;
    }
    
    const chatList = document.getElementById('chatsList');
    chatList.innerHTML = `
        <div class="archive-header" onclick="loadChats()">
            <i class="fas fa-arrow-left"></i>
            <span>Back to chats</span>
        </div>
        ${archivedContacts.map(contact => renderChatItem(contact)).join('')}
    `;
}

function updateArchiveCount() {
    document.getElementById('archiveCount').textContent = archivedChats.length;
}

function openChat(userId, userName, userPic) {
    // Check if blocked
    if (blockedUsers.includes(userId)) {
        showToast('You have blocked this contact. Unblock to chat.', 'error');
        return;
    }
    
    document.getElementById('chatView').style.display = 'flex';
    document.getElementById('chatsView').style.display = 'none';
    
    document.getElementById('chatPartnerPic').src = userPic;
    document.getElementById('chatPartnerName').textContent = userName;
    
    const user = users.find(u => u.id === userId);
    const lastSeen = user.status === 'online' ? 'online' : `last seen ${timeAgo(user.lastSeen)}`;
    document.getElementById('chatPartnerStatus').textContent = lastSeen;
    
    currentChatPartner = { id: userId, name: userName, pic: userPic, phone: user.phone, about: user.about };
    
    // Mark messages as read
    messages.forEach(m => {
        if (m.senderId === userId && m.receiverId === currentUser.id) {
            m.read = true;
        }
    });
    saveMessages();
    
    loadMessages(userId);
    loadChats(); // Update unread counts
    
    // Simulate typing indicator
    startTypingSimulation();
}

function closeChat() {
    document.getElementById('chatView').style.display = 'none';
    document.getElementById('chatsView').style.display = 'block';
    currentChatPartner = null;
    
    // Stop typing simulation
    if (typingTimer) {
        clearInterval(typingTimer);
    }
}

function startTypingSimulation() {
    if (typingTimer) clearInterval(typingTimer);
    
    typingTimer = setInterval(() => {
        if (currentChatPartner && Math.random() > 0.7) {
            const user = users.find(u => u.id === currentChatPartner.id);
            user.isTyping = true;
            loadChats();
            
            setTimeout(() => {
                user.isTyping = false;
                loadChats();
            }, 3000);
        }
    }, 10000);
}

function loadMessages(partnerId) {
    const container = document.getElementById('messagesContainer');
    
    const chatMessages = messages
        .filter(m => (m.senderId === currentUser.id && m.receiverId === partnerId) ||
                    (m.senderId === partnerId && m.receiverId === currentUser.id))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    if (chatMessages.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-comments" style="font-size: 48px; margin-bottom: 15px; color: #ddd;"></i>
                <h3>No messages yet</h3>
                <p>Say hello! 👋</p>
            </div>
        `;
        return;
    }
    
    let lastDate = null;
    let html = '';
    
    chatMessages.forEach(msg => {
        const msgDate = new Date(msg.timestamp).toDateString();
        if (msgDate !== lastDate) {
            html += `
                <div class="date-separator">
                    <span>${formatDate(msg.timestamp)}</span>
                </div>
            `;
            lastDate = msgDate;
        }
        
        html += `
            <div class="message ${msg.senderId === currentUser.id ? 'sent' : 'received'}" 
                 oncontextmenu="showMessageContextMenu(event, '${msg.id}')">
                <div class="message-content">
                    ${msg.content}
                    <div class="message-footer">
                        <span class="message-time">${formatTime(msg.timestamp)}</span>
                        ${msg.senderId === currentUser.id ? 
                            `<span class="message-status">
                                <i class="fas fa-check${msg.read ? '-double' : ''}" 
                                   style="color: ${msg.read ? '#4fc3f7' : '#999'};"></i>
                            </span>` 
                            : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
}

function showMessageContextMenu(event, messageId) {
    event.preventDefault();
    const message = messages.find(m => m.id === messageId);
    
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.cssText = `
        position: fixed;
        top: ${event.clientY}px;
        left: ${event.clientX}px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        min-width: 200px;
    `;
    
    menu.innerHTML = `
        <div class="context-menu-item" onclick="copyMessage('${messageId}')">
            <i class="fas fa-copy"></i>
            <span>Copy</span>
        </div>
        <div class="context-menu-item" onclick="forwardMessage('${messageId}')">
            <i class="fas fa-share"></i>
            <span>Forward</span>
        </div>
        <div class="context-menu-item" onclick="starMessage('${messageId}')">
            <i class="fas fa-star"></i>
            <span>Star</span>
        </div>
        <div class="context-menu-item" onclick="deleteMessage('${messageId}')" style="color: #f44336;">
            <i class="fas fa-trash"></i>
            <span>Delete</span>
        </div>
    `;
    
    document.body.appendChild(menu);
    
    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }, { once: true });
    }, 100);
}

function copyMessage(messageId) {
    const message = messages.find(m => m.id === messageId);
    if (message) {
        navigator.clipboard.writeText(message.content);
        showToast('Message copied');
    }
}

function forwardMessage(messageId) {
    showToast('Forward feature coming soon!');
}

function starMessage(messageId) {
    showToast('Message starred');
}

function deleteMessage(messageId) {
    showConfirm('Delete this message?',
        `deleteMessageConfirmed('${messageId}')`,
        ''
    );
}

function deleteMessageConfirmed(messageId) {
    messages = messages.filter(m => m.id !== messageId);
    saveMessages();
    if (currentChatPartner) {
        loadMessages(currentChatPartner.id);
    }
    showToast('Message deleted');
}

function sendMessage() {
    const messageText = document.getElementById('messageText').value;
    if (!messageText.trim() || !currentChatPartner) return;
    
    // Check if blocked
    if (blockedUsers.includes(currentChatPartner.id)) {
        showToast('Cannot send message to blocked contact', 'error');
        return;
    }
    
    const newMessage = {
        id: generateId(),
        senderId: currentUser.id,
        receiverId: currentChatPartner.id,
        content: messageText,
        timestamp: new Date().toISOString(),
        read: false
    };
    
    messages.push(newMessage);
    saveMessages();
    
    document.getElementById('messageText').value = '';
    loadMessages(currentChatPartner.id);
    loadChats();
    
    // Simulate delivery and read receipts
    setTimeout(() => {
        newMessage.read = true;
        saveMessages();
        if (currentChatPartner?.id === newMessage.receiverId) {
            loadMessages(currentChatPartner.id);
        }
    }, 3000);
    
    // Simulate reply
    setTimeout(() => {
        if (Math.random() > 0.5 && currentChatPartner) {
            const replyMessage = {
                id: generateId(),
                senderId: currentChatPartner.id,
                receiverId: currentUser.id,
                content: getRandomReply(),
                timestamp: new Date().toISOString(),
                read: false
            };
            messages.push(replyMessage);
            saveMessages();
            loadMessages(currentChatPartner.id);
            loadChats();
            showNotification(currentChatPartner.name, replyMessage.content);
        }
    }, 5000);
}

function getRandomReply() {
    const replies = [
        '👍',
        '😂',
        '😊',
        'Cool!',
        'Nice!',
        'Thanks!',
        'Okay',
        'Sure',
        '👍👍',
        '😂😂'
    ];
    return replies[Math.floor(Math.random() * replies.length)];
}

function showNotification(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, { body });
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (userSettings.chats?.enterSends !== false) {
            sendMessage();
        }
    }
}

// Status Functions
function loadStatuses() {
    const statusList = document.getElementById('statusList');
    const viewedList = document.getElementById('viewedStatusList');
    
    // Group statuses by user (excluding current user)
    const userStatuses = {};
    const now = new Date();
    
    statuses.forEach(status => {
        const statusDate = new Date(status.timestamp);
        const hoursDiff = (now - statusDate) / (1000 * 60 * 60);
        
        // Only show statuses from last 24 hours
        if (hoursDiff <= 24 && status.userId !== currentUser.id) {
            if (!userStatuses[status.userId]) {
                userStatuses[status.userId] = [];
            }
            userStatuses[status.userId].push(status);
        }
    });
    
    const unviewedStatuses = [];
    const viewedStatuses = [];
    
    Object.keys(userStatuses).forEach(userId => {
        const user = users.find(u => u.id === userId);
        const userStatus = userStatuses[userId].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );
        const latestStatus = userStatus[0];
        const isViewed = latestStatus.views?.includes(currentUser.id);
        
        const statusItem = `
            <div class="status-item" onclick="viewUserStatuses('${userId}')">
                <div class="status-ring ${!isViewed ? 'active' : ''}">
                    <img src="${user.profilePic}" alt="${user.fullName}">
                </div>
                <div class="status-info">
                    <h4>${user.fullName}</h4>
                    <p>${timeAgo(latestStatus.timestamp)}</p>
                </div>
            </div>
        `;
        
        if (!isViewed) {
            unviewedStatuses.push(statusItem);
        } else {
            viewedStatuses.push(statusItem);
        }
    });
    
    statusList.innerHTML = unviewedStatuses.join('') || '<div class="empty-state">No recent status updates</div>';
    viewedList.innerHTML = viewedStatuses.join('') || '<div class="empty-state">No viewed statuses</div>';
}

function showMyStatusOptions() {
    const myStatus = statuses.filter(s => s.userId === currentUser.id).length > 0;
    
    if (myStatus) {
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            min-width: 200px;
        `;
        
        menu.innerHTML = `
            <div class="context-menu-item" onclick="viewMyStatus()">
                <i class="fas fa-eye"></i>
                <span>View my status</span>
            </div>
            <div class="context-menu-item" onclick="addStatus()">
                <i class="fas fa-plus"></i>
                <span>Add status</span>
            </div>
            <div class="context-menu-item" onclick="clearStatus()" style="color: #f44336;">
                <i class="fas fa-trash"></i>
                <span>Clear status</span>
            </div>
        `;
        
        document.body.appendChild(menu);
        
        setTimeout(() => {
            document.addEventListener('click', function closeMenu() {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }, { once: true });
        }, 100);
    } else {
        addStatus();
    }
}

function showMyStatusMenu(event) {
    event.stopPropagation();
    showMyStatusOptions();
}

function addStatus() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const newStatus = {
                    id: generateId(),
                    userId: currentUser.id,
                    type: file.type.startsWith('image/') ? 'image' : 'video',
                    content: event.target.result,
                    timestamp: new Date().toISOString(),
                    views: []
                };
                
                statuses.push(newStatus);
                saveStatuses();
                showToast('Status posted successfully!');
                updateUserInfo();
                loadStatuses();
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function viewMyStatus() {
    const myStatuses = statuses
        .filter(s => s.userId === currentUser.id)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    if (myStatuses.length > 0) {
        currentUserStatuses = myStatuses;
        currentStatusIndex = 0;
        openStatusViewer();
    }
}

function clearStatus() {
    showConfirm('Clear all your status updates?',
        'clearStatusConfirmed()',
        ''
    );
}

function clearStatusConfirmed() {
    statuses = statuses.filter(s => s.userId !== currentUser.id);
    saveStatuses();
    updateUserInfo();
    loadStatuses();
    showToast('Status cleared');
}

function viewUserStatuses(userId) {
    currentUserStatuses = statuses
        .filter(s => s.userId === userId)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    if (currentUserStatuses.length === 0) return;
    
    currentStatusIndex = 0;
    
    // Mark as viewed
    currentUserStatuses.forEach(status => {
        if (!status.views) status.views = [];
        if (!status.views.includes(currentUser.id)) {
            status.views.push(currentUser.id);
        }
    });
    saveStatuses();
    
    openStatusViewer();
    loadStatuses(); // Reload to update rings
}

function openStatusViewer() {
    document.getElementById('statusViewer').style.display = 'flex';
    showStatus(currentStatusIndex);
    startStatusTimer();
}

function showStatus(index) {
    const status = currentUserStatuses[index];
    const user = users.find(u => u.id === status.userId);
    
    document.getElementById('statusUserPic').src = user.profilePic;
    document.getElementById('statusUserName').textContent = user.fullName;
    document.getElementById('statusTime').textContent = timeAgo(status.timestamp);
    
    const display = document.getElementById('statusDisplay');
    
    if (status.type === 'image') {
        display.innerHTML = `<img src="${status.content}" alt="Status">`;
    } else if (status.type === 'video') {
        display.innerHTML = `<video src="${status.content}" autoplay controls></video>`;
    } else {
        display.innerHTML = `<div class="text-status" style="background: ${status.color || '#ff6b6b'}">${status.content}</div>`;
    }
    
    // Create progress bars
    let progressHtml = '<div class="status-progress-container">';
    currentUserStatuses.forEach((_, i) => {
        progressHtml += `
            <div class="progress-bar">
                <div class="progress-fill ${i === index ? 'active' : ''}" 
                     style="${i < index ? 'width: 100%;' : ''}"></div>
            </div>
        `;
    });
    progressHtml += '</div>';
    
    document.getElementById('statusProgress').innerHTML = progressHtml;
}

function startStatusTimer() {
    if (statusTimer) clearInterval(statusTimer);
    
    let seconds = 0;
    statusTimer = setInterval(() => {
        seconds++;
        
        // Update progress
        const progressFill = document.querySelector('.progress-fill.active');
        if (progressFill) {
            const percent = (seconds / 5) * 100;
            progressFill.style.width = `${percent}%`;
        }
        
        if (seconds >= 5) {
            seconds = 0;
            if (currentStatusIndex < currentUserStatuses.length - 1) {
                currentStatusIndex++;
                showStatus(currentStatusIndex);
            } else {
                closeStatusViewer();
            }
        }
    }, 1000);
}

function closeStatusViewer() {
    clearInterval(statusTimer);
    document.getElementById('statusViewer').style.display = 'none';
}

function replyToStatus() {
    showToast('Reply feature coming soon!');
}

function likeStatus() {
    showToast('Status liked!');
}

function shareStatus() {
    showToast('Share feature coming soon!');
}

// Call Functions
function loadCalls() {
    const callsList = document.getElementById('callsList');
    
    const userCalls = calls
        .filter(c => c.with === currentUser.id || c.with in (currentUser.contacts || []))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (userCalls.length === 0) {
        callsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-phone" style="font-size: 48px; margin-bottom: 15px; color: #ddd;"></i>
                <h3>No calls yet</h3>
                <p>Your call history will appear here</p>
            </div>
        `;
        return;
    }
    
    callsList.innerHTML = userCalls.map(call => {
        const contact = users.find(u => u.id === (call.with === currentUser.id ? call.from : call.with));
        if (!contact) return '';
        
        const isMissed = call.status === 'missed';
        const isIncoming = call.direction === 'incoming';
        
        return `
            <div class="call-item" onclick="openChat('${contact.id}', '${contact.fullName.replace(/'/g, "\\'")}', '${contact.profilePic}')">
                <img src="${contact.profilePic}" alt="${contact.fullName}">
                <div class="call-info">
                    <div class="call-name">${contact.fullName}</div>
                    <div class="call-details">
                        <i class="fas fa-${call.type === 'audio' ? 'phone' : 'video'}" 
                           style="color: ${isMissed ? '#f44336' : '#00a884'};"></i>
                        ${isIncoming ? 'Incoming' : 'Outgoing'} · 
                        ${call.status === 'answered' ? call.duration + ' min' : call.status}
                    </div>
                </div>
                <div class="call-time">${timeAgo(call.timestamp)}</div>
            </div>
        `;
    }).join('');
}

function startAudioCall() {
    if (!currentChatPartner) {
        showToast('Select a chat first!', 'error');
        return;
    }
    
    const call = {
        id: generateId(),
        type: 'audio',
        with: currentChatPartner.id,
        direction: 'outgoing',
        status: 'missed',
        timestamp: new Date().toISOString()
    };
    
    calls.push(call);
    saveCalls();
    loadCalls();
    
    showToast(`Calling ${currentChatPartner.name}...`);
    
    // Simulate call
    setTimeout(() => {
        if (Math.random() > 0.5) {
            call.status = 'answered';
            call.duration = Math.floor(Math.random() * 15) + 1;
            showToast(`Call ended (${call.duration} min)`);
        } else {
            showToast(`${currentChatPartner.name} didn't answer`);
        }
        saveCalls();
        loadCalls();
    }, 3000);
}

function startVideoCall() {
    if (!currentChatPartner) {
        showToast('Select a chat first!', 'error');
        return;
    }
    
    const call = {
        id: generateId(),
        type: 'video',
        with: currentChatPartner.id,
        direction: 'outgoing',
        status: 'missed',
        timestamp: new Date().toISOString()
    };
    
    calls.push(call);
    saveCalls();
    loadCalls();
    
    showToast(`Video calling ${currentChatPartner.name}...`);
    
    // Simulate call
    setTimeout(() => {
        if (Math.random() > 0.5) {
            call.status = 'answered';
            call.duration = Math.floor(Math.random() * 15) + 1;
            showToast(`Video call ended (${call.duration} min)`);
        } else {
            showToast(`${currentChatPartner.name} didn't answer`);
        }
        saveCalls();
        loadCalls();
    }, 3000);
}

function startNewCall() {
    showNewChat();
}

function createCallLink() {
    showToast('Call link feature coming soon!');
}

// Contact Info
function showContactInfo() {
    if (!currentChatPartner) return;
    
    document.getElementById('contactInfoPic').src = currentChatPartner.pic;
    document.getElementById('contactInfoName').textContent = currentChatPartner.name;
    document.getElementById('contactInfoAbout').textContent = currentChatPartner.about || 'Hey there! I am using EVO';
    document.getElementById('contactInfoPhone').textContent = currentChatPartner.phone;
    
    const user = users.find(u => u.id === currentChatPartner.id);
    const lastSeen = user.status === 'online' ? 'Online' : `Last seen ${timeAgo(user.lastSeen)}`;
    document.getElementById('contactInfoLastSeen').textContent = lastSeen;
    
    document.getElementById('contactInfoSheet').style.display = 'block';
}

function copyPhoneNumber() {
    navigator.clipboard.writeText(currentChatPartner.phone);
    showToast('Phone number copied');
}

function showEncryptionInfo() {
    showToast('Messages are end-to-end encrypted');
}

function blockContact() {
    if (!currentChatPartner) return;
    
    showConfirm(`Block ${currentChatPartner.name}?`,
        `blockContactConfirmed('${currentChatPartner.id}')`,
        ''
    );
}

function blockContactConfirmed(userId) {
    if (!blockedUsers.includes(userId)) {
        blockedUsers.push(userId);
        saveBlocked();
        closeChat();
        loadChats();
        showToast('Contact blocked');
    }
}

function reportContact() {
    showToast('Report feature coming soon!');
}

function deleteChat() {
    if (!currentChatPartner) return;
    deleteChatConfirmed(currentChatPartner.id);
    closeChat();
}

// New Chat
function showNewChat() {
    document.getElementById('newChatSheet').style.display = 'block';
    loadNewChatUsers();
}

function loadNewChatUsers() {
    const searchTerm = document.getElementById('newChatSearch')?.value.toLowerCase() || '';
    const usersList = document.getElementById('newChatUsersList');
    
    const otherUsers = users.filter(u => 
        u.id !== currentUser.id && 
        !blockedUsers.includes(u.id) &&
        (u.fullName.toLowerCase().includes(searchTerm) || 
         u.phone.includes(searchTerm))
    );
    
    if (otherUsers.length === 0) {
        usersList.innerHTML = '<div class="empty-state">No users found</div>';
        return;
    }
    
    usersList.innerHTML = otherUsers.map(user => `
        <div class="user-item" onclick="startNewChat('${user.id}', '${user.fullName.replace(/'/g, "\\'")}', '${user.profilePic}')">
            <img src="${user.profilePic}" alt="${user.fullName}">
            <div class="user-item-info">
                <div class="user-item-name">${user.fullName}</div>
                <div class="user-item-phone">${user.phone}</div>
            </div>
        </div>
    `).join('');
}

function searchNewChat() {
    loadNewChatUsers();
}

function startNewChat(userId, userName, userPic) {
    closeSheet('newChatSheet');
    openChat(userId, userName, userPic);
}

function newGroup() {
    showToast('Group feature coming soon!');
}

function newContact() {
    showToast('Add contact feature coming soon!');
}

function newCommunity() {
    showToast('Community feature coming soon!');
}

// Settings Functions
function updateSettingsInfo() {
    document.getElementById('settingsProfilePic').src = currentUser.profilePic;
    document.getElementById('settingsProfileName').textContent = currentUser.fullName;
    document.getElementById('settingsProfileAbout').textContent = currentUser.about || 'Hey there! I am using EVO';
}

function loadSettings() {
    // Update privacy settings display
    document.getElementById('lastSeenSetting').textContent = formatPrivacySetting(userSettings.privacy?.lastSeen || 'everyone');
    document.getElementById('profilePhotoSetting').textContent = formatPrivacySetting(userSettings.privacy?.profilePhoto || 'everyone');
    document.getElementById('aboutSetting').textContent = formatPrivacySetting(userSettings.privacy?.about || 'everyone');
    document.getElementById('statusSetting').textContent = formatPrivacySetting(userSettings.privacy?.status || 'contacts');
    document.getElementById('groupPrivacySetting').textContent = formatPrivacySetting(userSettings.privacy?.groupPrivacy || 'everyone');
    document.getElementById('disappearingTimer').textContent = userSettings.privacy?.disappearingMessages || 'Off';
    
    // Update read receipts toggle
    document.getElementById('readReceiptsToggle').checked = userSettings.privacy?.readReceipts !== false;
    
    // Update blocked count
    document.getElementById('blockedCount').textContent = blockedUsers.length;
    
    // Update chat settings
    document.getElementById('enterSendsToggle').checked = userSettings.chats?.enterSends !== false;
    document.getElementById('mediaVisibilityToggle').checked = userSettings.chats?.mediaVisibility !== false;
    document.getElementById('keepArchivedToggle').checked = userSettings.chats?.keepArchived || false;
    document.getElementById('fontSizeSetting').textContent = capitalizeFirst(userSettings.chats?.fontSize || 'medium');
    
    // Update notification settings
    document.getElementById('messageNotificationsToggle').checked = userSettings.notifications?.messages !== false;
    document.getElementById('groupNotificationsToggle').checked = userSettings.notifications?.groups !== false;
    document.getElementById('callNotificationsToggle').checked = userSettings.notifications?.calls !== false;
    document.getElementById('popupNotificationToggle').checked = userSettings.notifications?.popup || false;
    document.getElementById('lightToggle').checked = userSettings.notifications?.light !== false;
    document.getElementById('callVibrateToggle').checked = userSettings.notifications?.callVibrate !== false;
    
    document.getElementById('notificationTone').textContent = capitalizeFirst(userSettings.notifications?.tone || 'default');
    document.getElementById('notificationVibrate').textContent = capitalizeFirst(userSettings.notifications?.vibrate || 'default');
    document.getElementById('groupNotificationTone').textContent = capitalizeFirst(userSettings.notifications?.groupTone || 'default');
    document.getElementById('callTone').textContent = capitalizeFirst(userSettings.notifications?.callTone || 'default');
}

function formatPrivacySetting(value) {
    const map = {
        'everyone': 'Everyone',
        'contacts': 'My Contacts',
        'nobody': 'Nobody',
        'off': 'Off'
    };
    return map[value] || value;
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showProfile() {
    showToast('Profile settings coming soon!');
}

function showSettingsPage(page) {
    // Hide all settings pages
    document.getElementById('accountSettingsPage').style.display = 'none';
    document.getElementById('privacySettingsPage').style.display = 'none';
    document.getElementById('chatsSettingsPage').style.display = 'none';
    document.getElementById('notificationsSettingsPage').style.display = 'none';
    
    // Show selected page
    document.getElementById(`${page}SettingsPage`).style.display = 'block';
}

function closeSettingsPage() {
    document.getElementById('accountSettingsPage').style.display = 'none';
    document.getElementById('privacySettingsPage').style.display = 'none';
    document.getElementById('chatsSettingsPage').style.display = 'none';
    document.getElementById('notificationsSettingsPage').style.display = 'none';
}

// Privacy Settings
function changeLastSeen() {
    const options = ['Everyone', 'My Contacts', 'Nobody'];
    showOptionPicker('Last seen', options, (selected) => {
        const value = selected.toLowerCase().replace(' ', '');
        userSettings.privacy.lastSeen = value;
        saveSettings();
        document.getElementById('lastSeenSetting').textContent = selected;
        showToast('Last seen privacy updated');
    });
}

function changeProfilePhoto() {
    const options = ['Everyone', 'My Contacts', 'Nobody'];
    showOptionPicker('Profile photo', options, (selected) => {
        const value = selected.toLowerCase().replace(' ', '');
        userSettings.privacy.profilePhoto = value;
        saveSettings();
        document.getElementById('profilePhotoSetting').textContent = selected;
        showToast('Profile photo privacy updated');
    });
}

function changeAbout() {
    const options = ['Everyone', 'My Contacts', 'Nobody'];
    showOptionPicker('About', options, (selected) => {
        const value = selected.toLowerCase().replace(' ', '');
        userSettings.privacy.about = value;
        saveSettings();
        document.getElementById('aboutSetting').textContent = selected;
        showToast('About privacy updated');
    });
}

function changeStatus() {
    const options = ['My Contacts', 'Nobody'];
    showOptionPicker('Status', options, (selected) => {
        const value = selected.toLowerCase().replace(' ', '');
        userSettings.privacy.status = value;
        saveSettings();
        document.getElementById('statusSetting').textContent = selected;
        showToast('Status privacy updated');
    });
}

function changeGroupPrivacy() {
    const options = ['Everyone', 'My Contacts'];
    showOptionPicker('Who can add me to groups', options, (selected) => {
        const value = selected.toLowerCase().replace(' ', '');
        userSettings.privacy.groupPrivacy = value;
        saveSettings();
        document.getElementById('groupPrivacySetting').textContent = selected;
        showToast('Group privacy updated');
    });
}

function changeDisappearingMessages() {
    const options = ['Off', '24 hours', '7 days', '90 days'];
    showOptionPicker('Default message timer', options, (selected) => {
        userSettings.privacy.disappearingMessages = selected;
        saveSettings();
        document.getElementById('disappearingTimer').textContent = selected;
        showToast('Disappearing messages updated');
    });
}

function toggleReadReceipts() {
    userSettings.privacy.readReceipts = document.getElementById('readReceiptsToggle').checked;
    saveSettings();
    showToast('Read receipts ' + (userSettings.privacy.readReceipts ? 'enabled' : 'disabled'));
}

function showBlockedContacts() {
    const blockedList = blockedUsers.map(id => users.find(u => u.id === id)).filter(u => u);
    
    if (blockedList.length === 0) {
        showToast('No blocked contacts');
        return;
    }
    
    let message = 'Blocked contacts:\n';
    blockedList.forEach(u => {
        message += `\n• ${u.fullName} (${u.phone})`;
    });
    
    showToast(message, 'info', 5000);
}

// Chat Settings
function toggleEnterSends() {
    userSettings.chats.enterSends = document.getElementById('enterSendsToggle').checked;
    saveSettings();
    showToast('Enter key sends ' + (userSettings.chats.enterSends ? 'enabled' : 'disabled'));
}

function toggleMediaVisibility() {
    userSettings.chats.mediaVisibility = document.getElementById('mediaVisibilityToggle').checked;
    saveSettings();
}

function toggleKeepArchived() {
    userSettings.chats.keepArchived = document.getElementById('keepArchivedToggle').checked;
    saveSettings();
}

function changeFontSize() {
    const options = ['Small', 'Medium', 'Large'];
    showOptionPicker('Font size', options, (selected) => {
        const value = selected.toLowerCase();
        userSettings.chats.fontSize = value;
        saveSettings();
        document.getElementById('fontSizeSetting').textContent = selected;
        
        // Apply font size
        document.documentElement.style.fontSize = 
            value === 'small' ? '14px' : 
            value === 'large' ? '18px' : '16px';
        
        showToast('Font size updated');
    });
}

function changeWallpaper() {
    showToast('Wallpaper feature coming soon!');
}

function backupChats() {
    const backup = {
        users: users,
        messages: messages,
        calls: calls,
        statuses: statuses,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(backup);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `evo_backup_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    document.getElementById('lastBackup').textContent = 'Today';
    showToast('Chats backed up successfully');
}

function exportChats() {
    showToast('Export feature coming soon!');
}

function clearAllChats() {
    showConfirm('Clear all chats? This action cannot be undone.',
        'clearAllChatsConfirmed()',
        ''
    );
}

function clearAllChatsConfirmed() {
    messages = messages.filter(m => 
        m.senderId === currentUser.id && m.receiverId === 'system'
    );
    saveMessages();
    loadChats();
    showToast('All chats cleared');
}

// Notification Settings
function toggleMessageNotifications() {
    userSettings.notifications.messages = document.getElementById('messageNotificationsToggle').checked;
    saveSettings();
}

function toggleGroupNotifications() {
    userSettings.notifications.groups = document.getElementById('groupNotificationsToggle').checked;
    saveSettings();
}

function toggleCallNotifications() {
    userSettings.notifications.calls = document.getElementById('callNotificationsToggle').checked;
    saveSettings();
}

function togglePopupNotification() {
    userSettings.notifications.popup = document.getElementById('popupNotificationToggle').checked;
    saveSettings();
}

function toggleLight() {
    userSettings.notifications.light = document.getElementById('lightToggle').checked;
    saveSettings();
}

function toggleCallVibrate() {
    userSettings.notifications.callVibrate = document.getElementById('callVibrateToggle').checked;
    saveSettings();
}

function changeNotificationTone() {
    const options = ['Default', 'Chime', 'Bell', 'Digital', 'None'];
    showOptionPicker('Notification tone', options, (selected) => {
        const value = selected.toLowerCase();
        userSettings.notifications.tone = value;
        saveSettings();
        document.getElementById('notificationTone').textContent = selected;
        showToast('Notification tone updated');
    });
}

function changeNotificationVibrate() {
    const options = ['Default', 'Short', 'Long', 'None'];
    showOptionPicker('Vibrate', options, (selected) => {
        const value = selected.toLowerCase();
        userSettings.notifications.vibrate = value;
        saveSettings();
        document.getElementById('notificationVibrate').textContent = selected;
        showToast('Vibrate setting updated');
    });
}

function changeGroupNotificationTone() {
    const options = ['Default', 'Chime', 'Bell', 'Digital', 'None'];
    showOptionPicker('Group notification tone', options, (selected) => {
        const value = selected.toLowerCase();
        userSettings.notifications.groupTone = value;
        saveSettings();
        document.getElementById('groupNotificationTone').textContent = selected;
        showToast('Group notification tone updated');
    });
}

function changeCallTone() {
    const options = ['Default', 'Chime', 'Bell', 'Digital', 'None'];
    showOptionPicker('Call ringtone', options, (selected) => {
        const value = selected.toLowerCase();
        userSettings.notifications.callTone = value;
        saveSettings();
        document.getElementById('callTone').textContent = selected;
        showToast('Call ringtone updated');
    });
}

// Account Settings
function changePrivacy() {
    showSettingsPage('privacy');
}

function changeSecurity() {
    showToast('Security settings coming soon!');
}

function twoStepVerification() {
    showToast('Two-step verification coming soon!');
}

function changeNumber() {
    showToast('Change number feature coming soon!');
}

function requestAccountInfo() {
    showToast('Account info request sent. Check your email.');
}

function deleteAccount() {
    showConfirm('Delete your account? This action cannot be undone.',
        'deleteAccountConfirmed()',
        ''
    );
}

function deleteAccountConfirmed() {
    users = users.filter(u => u.id !== currentUser.id);
    saveUsers();
    logoutConfirmed();
    showToast('Account deleted');
}

// Option Picker
function showOptionPicker(title, options, callback) {
    const picker = document.createElement('div');
    picker.className = 'bottom-sheet';
    picker.style.display = 'block';
    picker.style.zIndex = '11000';
    
    let optionsHtml = '';
    options.forEach(option => {
        optionsHtml += `
            <div class="option-item" onclick="selectOption('${option}', ${callback})">
                <span>${option}</span>
            </div>
        `;
    });
    
    picker.innerHTML = `
        <div class="sheet-handle"></div>
        <div class="sheet-header">
            <h3>${title}</h3>
            <i class="fas fa-times" onclick="this.parentElement.parentElement.remove()"></i>
        </div>
        <div class="sheet-content">
            ${optionsHtml}
        </div>
    `;
    
    document.body.appendChild(picker);
}

function selectOption(option, callback) {
    callback(option);
    document.querySelector('.bottom-sheet:last-child').remove();
}

// Search
function showSearch(type) {
    showToast('Search feature coming soon!');
}

// Camera
function showCamera() {
    showToast('Camera feature coming soon!');
}

function openCamera() {
    showToast('Camera feature coming soon!');
}

function openGallery() {
    showToast('Gallery feature coming soon!');
}

// Attachment Menu
function showAttachmentMenu() {
    document.getElementById('attachmentMenu').style.display = 'block';
}

function attachDocument() {
    showToast('Document attachment coming soon!');
    closeSheet('attachmentMenu');
}

function attachCamera() {
    showToast('Camera attachment coming soon!');
    closeSheet('attachmentMenu');
}

function attachGallery() {
    showToast('Gallery attachment coming soon!');
    closeSheet('attachmentMenu');
}

function attachAudio() {
    showToast('Audio attachment coming soon!');
    closeSheet('attachmentMenu');
}

function attachLocation() {
    showToast('Location sharing coming soon!');
    closeSheet('attachmentMenu');
}

function attachContact() {
    showToast('Contact sharing coming soon!');
    closeSheet('attachmentMenu');
}

// Voice Recording
function startVoiceRecording() {
    showToast('Voice recording coming soon!');
}

// Emoji Picker
function showEmojiPicker() {
    document.getElementById('emojiPicker').style.display = 'block';
    loadEmojis('smileys');
}

function loadEmojis(category) {
    const grid = document.getElementById('emojiGrid');
    const emojis = emojiCategories[category] || [];
    
    grid.innerHTML = emojis.map(emoji => 
        `<span onclick="insertEmoji('${emoji}')">${emoji}</span>`
    ).join('');
}

function selectEmojiCategory(category) {
    loadEmojis(category);
}

function searchEmoji() {
    const searchTerm = event.target.value.toLowerCase();
    const allEmojis = [...emojiCategories.smileys, ...emojiCategories.people, ...emojiCategories.animals, ...emojiCategories.food, ...emojiCategories.activities, ...emojiCategories.travel, ...emojiCategories.objects];
    
    const filtered = allEmojis.filter(e => e.includes(searchTerm));
    
    const grid = document.getElementById('emojiGrid');
    grid.innerHTML = filtered.map(emoji => 
        `<span onclick="insertEmoji('${emoji}')">${emoji}</span>`
    ).join('');
}

function insertEmoji(emoji) {
    const input = document.getElementById('messageText');
    input.value += emoji;
    closeEmojiPicker();
}

function closeEmojiPicker() {
    document.getElementById('emojiPicker').style.display = 'none';
}

// Menu Functions
function showChatMenu() {
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.cssText = `
        position: fixed;
        top: 60px;
        right: 15px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        min-width: 200px;
    `;
    
    menu.innerHTML = `
        <div class="context-menu-item" onclick="newGroup()">
            <i class="fas fa-users"></i>
            <span>New group</span>
        </div>
        <div class="context-menu-item" onclick="newBroadcast()">
            <i class="fas fa-bullhorn"></i>
            <span>New broadcast</span>
        </div>
        <div class="context-menu-item" onclick="starredMessages()">
            <i class="fas fa-star"></i>
            <span>Starred messages</span>
        </div>
        <div class="context-menu-item" onclick="settings()">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
        </div>
    `;
    
    document.body.appendChild(menu);
    
    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }, { once: true });
    }, 100);
}

function newBroadcast() {
    showToast('Broadcast feature coming soon!');
}

function starredMessages() {
    showToast('Starred messages feature coming soon!');
}

function settings() {
    switchMainTab('settings');
}

function showStatusMenu() {
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.cssText = `
        position: fixed;
        top: 60px;
        right: 15px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        min-width: 200px;
    `;
    
    menu.innerHTML = `
        <div class="context-menu-item" onclick="statusPrivacy()">
            <i class="fas fa-lock"></i>
            <span>Status privacy</span>
        </div>
        <div class="context-menu-item" onclick="mutedStatuses()">
            <i class="fas fa-bell-slash"></i>
            <span>Muted statuses</span>
        </div>
    `;
    
    document.body.appendChild(menu);
    
    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }, { once: true });
    }, 100);
}

function statusPrivacy() {
    showToast('Status privacy coming soon!');
}

function mutedStatuses() {
    showToast('Muted statuses coming soon!');
}

function showCallMenu() {
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.cssText = `
        position: fixed;
        top: 60px;
        right: 15px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        min-width: 200px;
    `;
    
    menu.innerHTML = `
        <div class="context-menu-item" onclick="clearCallLog()">
            <i class="fas fa-trash"></i>
            <span>Clear call log</span>
        </div>
        <div class="context-menu-item" onclick="callSettings()">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
        </div>
    `;
    
    document.body.appendChild(menu);
    
    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }, { once: true });
    }, 100);
}

function clearCallLog() {
    showConfirm('Clear call log?',
        'clearCallLogConfirmed()',
        ''
    );
}

function clearCallLogConfirmed() {
    calls = calls.filter(c => c.with !== currentUser.id);
    saveCalls();
    loadCalls();
    showToast('Call log cleared');
}

function callSettings() {
    switchMainTab('settings');
    showSettingsPage('notifications');
}

function showChatOptions() {
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.cssText = `
        position: fixed;
        top: 60px;
        right: 15px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        min-width: 200px;
    `;
    
    menu.innerHTML = `
        <div class="context-menu-item" onclick="contactInfo()">
            <i class="fas fa-info-circle"></i>
            <span>Contact info</span>
        </div>
        <div class="context-menu-item" onclick="muteChatNotifications()">
            <i class="fas fa-bell-slash"></i>
            <span>Mute notifications</span>
        </div>
        <div class="context-menu-item" onclick="disappearingMessages()">
            <i class="fas fa-clock"></i>
            <span>Disappearing messages</span>
        </div>
        <div class="context-menu-item" onclick="wallpaper()">
            <i class="fas fa-image"></i>
            <span>Wallpaper</span>
        </div>
        <div class="context-menu-item" onclick="moreChatOptions()">
            <i class="fas fa-ellipsis-h"></i>
            <span>More</span>
        </div>
    `;
    
    document.body.appendChild(menu);
    
    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }, { once: true });
    }, 100);
}

function contactInfo() {
    showContactInfo();
}

function muteChatNotifications() {
    showToast('Mute notifications coming soon!');
}

function disappearingMessages() {
    showToast('Disappearing messages coming soon!');
}

function wallpaper() {
    changeWallpaper();
}

function moreChatOptions() {
    showToast('More options coming soon!');
}

function showStatusOptions() {
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.cssText = `
        position: fixed;
        top: 60px;
        right: 15px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        min-width: 200px;
    `;
    
    menu.innerHTML = `
        <div class="context-menu-item" onclick="shareStatus()">
            <i class="fas fa-share"></i>
            <span>Share</span>
        </div>
        <div class="context-menu-item" onclick="deleteStatus()">
            <i class="fas fa-trash"></i>
            <span>Delete</span>
        </div>
    `;
    
    document.body.appendChild(menu);
    
    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }, { once: true });
    }, 100);
}

function deleteStatus() {
    if (currentUserStatuses.length > 0) {
        const statusId = currentUserStatuses[currentStatusIndex].id;
        statuses = statuses.filter(s => s.id !== statusId);
        saveStatuses();
        closeStatusViewer();
        loadStatuses();
        showToast('Status deleted');
    }
}

// Utility Functions
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm';
    if (diff < 86400000) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (diff < 604800000) return date.toLocaleDateString([], { weekday: 'short' });
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
    }
}

function timeAgo(timestamp) {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' min ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    if (seconds < 604800) return Math.floor(seconds / 86400) + ' days ago';
    return Math.floor(seconds / 604800) + ' weeks ago';
}

// Sheet Functions
function closeSheet(sheetId) {
    document.getElementById(sheetId).style.display = 'none';
}

function closeAllSheets() {
    document.getElementById('contactInfoSheet').style.display = 'none';
    document.getElementById('newChatSheet').style.display = 'none';
    document.getElementById('attachmentMenu').style.display = 'none';
    document.getElementById('emojiPicker').style.display = 'none';
}

// Click outside to close sheets
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('bottom-sheet')) {
        e.target.style.display = 'none';
    }
});

// Request notification permission
if ('Notification' in window) {
    Notification.requestPermission();
}

// Check for remembered user
window.onload = function() {
    const rememberedId = localStorage.getItem('evo_remembered_user');
    if (rememberedId) {
        const user = users.find(u => u.id === rememberedId);
        if (user) {
            currentUser = user;
            currentUser.status = 'online';
            currentUser.lastSeen = new Date().toISOString();
            saveUsers();
            
            document.getElementById('authContainer').style.display = 'none';
            document.getElementById('mainContainer').style.display = 'flex';
            document.getElementById('splashScreen').style.display = 'none';
            
            updateUserInfo();
            loadChats();
            loadStatuses();
            loadCalls();
            updateArchiveCount();
            loadSettings();
        }
    } else {
        setTimeout(() => {
            document.getElementById('splashScreen').style.display = 'none';
        }, 2000);
    }
};

// Make functions globally available
window.switchAuthTab = switchAuthTab;
window.triggerFileUpload = triggerFileUpload;
window.previewProfilePic = previewProfilePic;
window.handleRegister = handleRegister;
window.handleLogin = handleLogin;
window.showForgotPassword = showForgotPassword;
window.logout = logout;
window.switchMainTab = switchMainTab;
window.openChat = openChat;
window.closeChat = closeChat;
window.sendMessage = sendMessage;
window.handleKeyPress = handleKeyPress;
window.showMyStatusOptions = showMyStatusOptions;
window.showMyStatusMenu = showMyStatusMenu;
window.viewUserStatuses = viewUserStatuses;
window.closeStatusViewer = closeStatusViewer;
window.replyToStatus = replyToStatus;
window.likeStatus = likeStatus;
window.shareStatus = shareStatus;
window.startAudioCall = startAudioCall;
window.startVideoCall = startVideoCall;
window.startNewCall = startNewCall;
window.createCallLink = createCallLink;
window.showContactInfo = showContactInfo;
window.copyPhoneNumber = copyPhoneNumber;
window.showEncryptionInfo = showEncryptionInfo;
window.blockContact = blockContact;
window.reportContact = reportContact;
window.deleteChat = deleteChat;
window.showNewChat = showNewChat;
window.searchNewChat = searchNewChat;
window.startNewChat = startNewChat;
window.newGroup = newGroup;
window.newContact = newContact;
window.newCommunity = newCommunity;
window.showProfile = showProfile;
window.showSettingsPage = showSettingsPage;
window.closeSettingsPage = closeSettingsPage;
window.changeLastSeen = changeLastSeen;
window.changeProfilePhoto = changeProfilePhoto;
window.changeAbout = changeAbout;
window.changeStatus = changeStatus;
window.changeGroupPrivacy = changeGroupPrivacy;
window.changeDisappearingMessages = changeDisappearingMessages;
window.toggleReadReceipts = toggleReadReceipts;
window.showBlockedContacts = showBlockedContacts;
window.toggleEnterSends = toggleEnterSends;
window.toggleMediaVisibility = toggleMediaVisibility;
window.toggleKeepArchived = toggleKeepArchived;
window.changeFontSize = changeFontSize;
window.changeWallpaper = changeWallpaper;
window.backupChats = backupChats;
window.exportChats = exportChats;
window.clearAllChats = clearAllChats;
window.toggleMessageNotifications = toggleMessageNotifications;
window.toggleGroupNotifications = toggleGroupNotifications;
window.toggleCallNotifications = toggleCallNotifications;
window.togglePopupNotification = togglePopupNotification;
window.toggleLight = toggleLight;
window.toggleCallVibrate = toggleCallVibrate;
window.changeNotificationTone = changeNotificationTone;
window.changeNotificationVibrate = changeNotificationVibrate;
window.changeGroupNotificationTone = changeGroupNotificationTone;
window.changeCallTone = changeCallTone;
window.changePrivacy = changePrivacy;
window.changeSecurity = changeSecurity;
window.twoStepVerification = twoStepVerification;
window.changeNumber = changeNumber;
window.requestAccountInfo = requestAccountInfo;
window.deleteAccount = deleteAccount;
window.showSearch = showSearch;
window.showCamera = showCamera;
window.openCamera = openCamera;
window.openGallery = openGallery;
window.showAttachmentMenu = showAttachmentMenu;
window.attachDocument = attachDocument;
window.attachCamera = attachCamera;
window.attachGallery = attachGallery;
window.attachAudio = attachAudio;
window.attachLocation = attachLocation;
window.attachContact = attachContact;
window.startVoiceRecording = startVoiceRecording;
window.showEmojiPicker = showEmojiPicker;
window.selectEmojiCategory = selectEmojiCategory;
window.searchEmoji = searchEmoji;
window.insertEmoji = insertEmoji;
window.closeEmojiPicker = closeEmojiPicker;
window.showChatMenu = showChatMenu;
window.newBroadcast = newBroadcast;
window.starredMessages = starredMessages;
window.settings = settings;
window.showStatusMenu = showStatusMenu;
window.statusPrivacy = statusPrivacy;
window.mutedStatuses = mutedStatuses;
window.showCallMenu = showCallMenu;
window.clearCallLog = clearCallLog;
window.callSettings = callSettings;
window.showChatOptions = showChatOptions;
window.contactInfo = contactInfo;
window.muteChatNotifications = muteChatNotifications;
window.disappearingMessages = disappearingMessages;
window.wallpaper = wallpaper;
window.moreChatOptions = moreChatOptions;
window.showStatusOptions = showStatusOptions;
window.deleteStatus = deleteStatus;
window.closeSheet = closeSheet;
window.archiveChat = archiveChat;
window.markAsRead = markAsRead;
window.pinChat = pinChat;
window.muteChat = muteChat;
window.showArchivedChats = showArchivedChats;
window.copyMessage = copyMessage;
window.forwardMessage = forwardMessage;
window.starMessage = starMessage;
window.deleteMessage = deleteMessage;