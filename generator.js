(function () {
    'use strict';

    var APP_ID = 'di_ops_center';
    var MAX_SESSIONS = 5;
    var TEMPLATE_CHAR_LIMIT = 1100;
    var THEME_KEY = APP_ID + '_theme';
    var CLASS_LEVEL_KEY = APP_ID + '_class_level';
    var SESSIONS_KEY = APP_ID + '_sessions';
    var CLEAR_SESSIONS_UNDO_MS = 8000;
    var AI_TOOL_URLS = {
        chatgpt: 'https://chatgpt.com/',
        claude: 'https://claude.ai/',
        gemini: 'https://gemini.google.com/'
    };
    var AI_TOOL_ALLOWED_HOSTS = {
        'chatgpt.com': true,
        'claude.ai': true,
        'gemini.google.com': true
    };

    /* ===== CONSTANTS ===== */
    var DEFAULT_SOT = {
        modes: {
            LESSON: {
                label: 'LESSON',
                desc: 'Full lesson plan',
                formId: 'form-lesson',
                fields: ['topic', 'duration', 'goal', 'context', 'question']
            },
            ASSESSMENT: {
                label: 'ASSESSMENT',
                desc: 'Knowledge check',
                formId: 'form-assessment',
                fields: ['topic', 'format', 'difficulty', 'question']
            },
            TASKS: {
                label: 'TASKS',
                desc: 'Classwork and homework',
                formId: 'form-tasks',
                fields: ['topic', 'task_type', 'constraints', 'question']
            },
            PRESENTATION: {
                label: 'PRESENTATION',
                desc: 'Slide outline',
                formId: 'form-presentation',
                fields: ['topic', 'slides', 'style', 'question']
            },
            STRATEGY: {
                label: 'STRATEGY',
                desc: 'Teaching methods and priorities',
                formId: 'form-strategy',
                fields: ['topic', 'goal', 'challenges', 'question']
            }
        },
        libraryPrompts: [
            {
                id: 'lesson_plan',
                title: 'Full lesson plan',
                desc: 'From intro to reflection',
                icon: 'book-open',
                prompt: 'Role: You are an experienced teaching assistant. Use the data from the form.\nOUTPUT:\n- Lesson flow in stages: intro, main activities, reflection.\n- 3 clear activities with timing and teacher instructions.\n- 5 discussion questions to engage students.\n- A hands-on task with assessment criteria.'
            },
            {
                id: 'assessment_quiz',
                title: 'Quick assessment',
                desc: 'Quiz plus open questions',
                icon: 'clipboard-check',
                prompt: 'Role: You are an assessment design assistant. Use the data from the form.\nOUTPUT:\n- Multiple choice questions (4 options, 1 correct); scale the count to the grade and difficulty.\n- Open-ended questions focused on understanding and application.\n- A clear answer key.\n- Short scoring criteria for the open questions.'
            },
            {
                id: 'homework_tasks',
                title: 'Differentiated assignments',
                desc: 'Support, core, and stretch',
                icon: 'pencil-ruler',
                prompt: 'Role: You are a differentiated assignment designer. Use the data from the form.\nOUTPUT:\n- A support-level task with a clear scaffolding hint.\n- A core task for the whole class.\n- A stretch task for advanced students.\n- Assessment criteria for each level.'
            },
            {
                id: 'presentation_outline',
                title: 'Presentation outline',
                desc: 'Slide plan with talking points',
                icon: 'presentation',
                prompt: 'Role: You are an educational slide-structure assistant. Use the data from the form.\nOUTPUT:\n- A numbered slide outline.\n- For each slide: goal, 2-3 bullets, one visual idea.\n- Smooth transitions between slides.\n- One reflection question for students at the end.'
            },
            {
                id: 'teaching_strategy',
                title: 'Teaching strategy',
                desc: 'Method and weekly focus',
                icon: 'brain',
                prompt: 'Role: You are a teaching-strategy assistant. Use the goal and challenges from the form.\nOUTPUT:\n- 3 priority instructional moves.\n- A short weekly activity sequence.\n- Risks and prevention steps.\n- 2-3 progress indicators.'
            },
            {
                id: 'lesson_reflection',
                title: 'Lesson reflection',
                desc: 'What worked, what to improve',
                icon: 'refresh-ccw',
                prompt: 'Role: You are a reflection and quality-improvement assistant. Use the data from the form.\nOUTPUT:\n- 3 things worth repeating.\n- 3 things worth changing.\n- A 5-step adjustment plan for the next lesson.\n- One short self-reflection prompt for the teacher.'
            }
        ],
        rules: [
            { text: 'Every prompt should lead to a clear, classroom-ready outcome.', icon: 'check-circle' },
            { text: 'Clarity beats complexity: one mode, one goal.', icon: 'check-circle' },
            { text: 'Activities should be doable in your classroom.', icon: 'check-circle' },
            { text: 'Define assessment criteria up front.', icon: 'check-circle' },
            { text: 'Presentation mode returns a text outline \u2014 bring it into your slides tool.', icon: 'check-circle' }
        ],
        copy: {},
        commerce: {
            allowPlaceholderCheckout: false,
            stripePaymentLinks: {
                beginners: 'https://buy.stripe.com/eVq28r8e88Rf6pC4dGfjG04',
                advanced: 'https://buy.stripe.com/28E8wPamgd7v15i11ufjG05'
            },
            pricing: {
                beginners: { now: '$4.99', was: '$9.99' },
                advanced: { now: '$9.99', was: '$19.99' }
            },
            products: {
                beginners: {
                    name: 'Beginners \u2014 Prompt Anatomy',
                    image: '/assets/pdf-covers/beginners.png',
                    price: '4.99',
                    currency: 'USD',
                    sku: 'beginners-pdf',
                    category: 'Educational eBook'
                },
                advanced: {
                    name: 'Advanced \u2014 Prompt Anatomy',
                    image: '/assets/pdf-covers/advanced.png',
                    price: '9.99',
                    currency: 'USD',
                    sku: 'advanced-pdf',
                    category: 'Educational eBook'
                }
            },
            compareStrip: {
                pdLabel: 'Typical single-session PD',
                pdValue: 'often $100+',
                vsLabel: 'vs',
                beginnersLabel: 'Beginners guide',
                advancedLabel: 'Advanced guide',
                caption: 'Classroom-ready in a week. Re-readable. Yours to print and use across every section you teach.',
                sourceNote: 'Estimate; replace with cited figure when available.'
            },
            deliveryPromise: 'Usually within a minute: Stripe receipt plus a separate download email. The success page also shows a one-click download. Link valid 7 days \u2014 ask us to resend anytime.',
            pilotMeta: 'Shaped with pilot feedback from US K\u201312 teachers across grade bands and content areas.',
            testimonialsNote: 'Quotes paraphrased from pilot feedback during private beta. Names withheld at request; school identifiers redacted.',
            testimonials: []
        },
        legal: {
            operatorLine: '\u00a9 2026 Tomas Staniulis. Educational tool. All rights reserved.',
            entityNote: 'LEGAL_REVIEW: replace with counsel-approved entity name, state, and country before paid ads.'
        },
        theme: {
            light: {
                '--primary': '#0F2A44',
                '--primary-hover': '#0B2238',
                '--primary-light': '#2F6FED',
                '--accent-gold': '#F5C518',
                '--accent-gold-hover': '#E6B800',
                '--surface-0': '#F4F7FB',
                '--surface-1': '#FFFFFF',
                '--text': '#1C2B3A',
                '--text-light': '#6B7A8C',
                '--border': '#E6ECF2',
                '--output-bg': '#0F2A44'
            },
            dark: {
                '--primary': '#2F6FED',
                '--primary-hover': '#2458BD',
                '--primary-light': '#4E87F2',
                '--accent-gold': '#F5C518',
                '--accent-gold-hover': '#E6B800',
                '--surface-0': '#0B1422',
                '--surface-1': '#111D2D',
                '--text': '#E8EEF6',
                '--text-light': '#A4B2C3',
                '--border': '#273649',
                '--output-bg': '#0B1625'
            }
        }
    };

    var MODES = cloneJson(DEFAULT_SOT.modes);
    var LIBRARY_PROMPTS = cloneJson(DEFAULT_SOT.libraryPrompts);

    function applyLibraryPromptLimit() {
        LIBRARY_PROMPTS.forEach(function (item) {
            if (!item || typeof item.prompt !== 'string') return;

            var text = item.prompt.replace(/\r\n/g, '\n').trim();
            if (text.length > TEMPLATE_CHAR_LIMIT) {
                var truncated = text.slice(0, TEMPLATE_CHAR_LIMIT).trim();
                var breakAt = Math.max(truncated.lastIndexOf('\n'), truncated.lastIndexOf('. '));
                if (breakAt > Math.floor(TEMPLATE_CHAR_LIMIT * 0.7)) {
                    truncated = truncated.slice(0, breakAt).trim();
                }
                text = truncated;
            }

            item.prompt = text;
        });
    }

    applyLibraryPromptLimit();

    var RULES = cloneJson(DEFAULT_SOT.rules);
    var COPY_TEXT = {};
    var THEME_TOKENS = DEFAULT_SOT.theme;

    function cloneJson(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function assignSotConfig(sot) {
        if (!sot || typeof sot !== 'object') return;
        if (sot.modes && typeof sot.modes === 'object') MODES = sot.modes;
        if (Array.isArray(sot.libraryPrompts)) LIBRARY_PROMPTS = sot.libraryPrompts;
        if (Array.isArray(sot.rules)) RULES = sot.rules;
        if (sot.copy && typeof sot.copy === 'object') COPY_TEXT = sot.copy;
        if (sot.theme && typeof sot.theme === 'object') THEME_TOKENS = sot.theme;
        applyLibraryPromptLimit();
    }

    function loadSotConfig() {
        // Local file mode (file://) commonly blocks fetch in browsers.
        if (window.location && window.location.protocol === 'file:') {
            return Promise.resolve(cloneJson(DEFAULT_SOT));
        }

        return fetch('config/sot.json', { cache: 'no-store' })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Failed loading config/sot.json');
                }
                return response.json();
            })
            .then(function (remoteConfig) {
                var merged = cloneJson(DEFAULT_SOT);
                var remote = remoteConfig || {};
                Object.keys(remote).forEach(function (key) {
                    if (key === 'commerce' && remote.commerce && typeof remote.commerce === 'object') {
                        merged.commerce = Object.assign({}, merged.commerce, remote.commerce);
                        if (remote.commerce.stripePaymentLinks && typeof remote.commerce.stripePaymentLinks === 'object') {
                            merged.commerce.stripePaymentLinks = Object.assign(
                                {},
                                merged.commerce.stripePaymentLinks,
                                remote.commerce.stripePaymentLinks
                            );
                        }
                        return;
                    }
                    merged[key] = remote[key];
                });
                return merged;
            })
            .catch(function () {
                return cloneJson(DEFAULT_SOT);
            });
    }

    /* ===== STATE ===== */

    var activeMode = 'LESSON';
    var activeClassLevel = '7';
    var formData = {};
    var lastClearedSessions = null;
    var clearUndoTimer = null;

    function initFormData() {
        formData = {};
        Object.keys(MODES).forEach(function (mode) {
            formData[mode] = {};
            MODES[mode].fields.forEach(function (field) {
                formData[mode][field] = '';
            });
        });
    }

    initFormData();

    /* ===== HELPERS ===== */

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function isFilled(value) {
        return String(value || '').trim().length > 0;
    }

    function hasAnyFormInput() {
        return Object.keys(MODES).some(function (mode) {
            if (!formData[mode]) return false;
            return MODES[mode].fields.some(function (field) {
                return isFilled(formData[mode][field]);
            });
        });
    }

    function updateStickyCopyVisibility() {
        var stickyCopy = document.getElementById('stickyCopyBtn');
        if (!stickyCopy) return;
        var shouldShow = hasAnyFormInput();
        stickyCopy.classList.toggle('is-hidden', !shouldShow);
        stickyCopy.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
        stickyCopy.disabled = !shouldShow;
    }

    /* ===== PROMPT GENERATION ===== */

    function buildLessonPrompt(data) {
        var parts = [];

        parts.push('Role: You are an experienced teaching assistant building a clear lesson plan.');
        parts.push('');

        parts.push('LESSON CONTEXT:');
        parts.push('- Grade: Grade ' + activeClassLevel);
        if (isFilled(data.topic)) parts.push('- Topic: ' + data.topic);
        if (isFilled(data.duration)) parts.push('- Length: ' + data.duration);
        if (isFilled(data.goal)) parts.push('- Goal: ' + data.goal);
        parts.push('');

        if (isFilled(data.context)) {
            parts.push('ADDITIONAL CONTEXT: ' + data.context);
            parts.push('');
        }

        parts.push('TASK:');
        if (isFilled(data.question)) {
            parts.push(data.question);
        } else {
            parts.push('Build a full lesson plan with an intro, activities, discussion questions, a hands-on task, and reflection.');
        }

        return parts.join('\n');
    }

    function buildAssessmentPrompt(data) {
        var parts = [];

        parts.push('Role: You are an assessment design assistant for a teacher.');
        parts.push('');
        parts.push('ASSESSMENT CONTEXT:');
        parts.push('- Grade: Grade ' + activeClassLevel);
        if (isFilled(data.topic)) parts.push('- Topic: ' + data.topic);
        if (isFilled(data.format)) parts.push('- Format: ' + data.format);
        if (isFilled(data.difficulty)) parts.push('- Difficulty: ' + data.difficulty);
        parts.push('');
        parts.push('TASK:');
        if (isFilled(data.question)) {
            parts.push(data.question);
        } else {
            parts.push('Build a quiz with multiple choice and open-ended questions and include an answer key.');
        }
        return parts.join('\n');
    }

    function buildTasksPrompt(data) {
        var parts = [];

        parts.push('Role: You are a learning-task designer for a teacher.');
        parts.push('');
        parts.push('TASKS CONTEXT:');
        parts.push('- Grade: Grade ' + activeClassLevel);
        if (isFilled(data.topic)) parts.push('- Topic: ' + data.topic);
        if (isFilled(data.task_type)) parts.push('- Task type: ' + data.task_type);
        if (isFilled(data.constraints)) parts.push('- Constraints: ' + data.constraints);
        parts.push('');
        parts.push('TASK:');
        if (isFilled(data.question)) {
            parts.push(data.question);
        } else {
            parts.push('Build classwork, homework, and project tasks with rubric-style assessment criteria.');
        }
        return parts.join('\n');
    }

    function buildPresentationPrompt(data) {
        var parts = [];

        parts.push('Role: You are an educational presentation-structure assistant.');
        parts.push('');
        parts.push('PRESENTATION CONTEXT:');
        parts.push('- Grade: Grade ' + activeClassLevel);
        if (isFilled(data.topic)) parts.push('- Topic: ' + data.topic);
        if (isFilled(data.slides)) parts.push('- Number of slides: ' + data.slides);
        if (isFilled(data.style)) parts.push('- Style: ' + data.style);
        parts.push('');
        parts.push('TASK:');
        if (isFilled(data.question)) {
            parts.push(data.question);
        } else {
            parts.push('Build a slide outline with talking points and visual ideas. Do not propose third-party tool integrations.');
        }
        return parts.join('\n');
    }

    function buildStrategyPrompt(data) {
        var parts = [];

        parts.push('Role: You are a teaching-strategy assistant for a teacher.');
        parts.push('');
        parts.push('STRATEGY CONTEXT:');
        parts.push('- Grade: Grade ' + activeClassLevel);
        if (isFilled(data.topic)) parts.push('- Topic: ' + data.topic);
        if (isFilled(data.goal)) parts.push('- Goal: ' + data.goal);
        if (isFilled(data.challenges)) parts.push('- Challenges: ' + data.challenges);
        parts.push('');
        parts.push('TASK:');
        if (isFilled(data.question)) {
            parts.push(data.question);
        } else {
            parts.push('Suggest methods, an activity model, discussion techniques, and active-learning ideas.');
        }
        return parts.join('\n');
    }

    function getGeneratedPrompt() {
        var data = formData[activeMode] || {};
        if (activeMode === 'LESSON') return buildLessonPrompt(data);
        if (activeMode === 'ASSESSMENT') return buildAssessmentPrompt(data);
        if (activeMode === 'TASKS') return buildTasksPrompt(data);
        if (activeMode === 'PRESENTATION') return buildPresentationPrompt(data);
        return buildStrategyPrompt(data);
    }

    /* ===== OUTPUT UPDATE ===== */

    function updateOutput() {
        var el = document.getElementById('opsOutput');
        if (!el) return;

        var prompt = getGeneratedPrompt();

        el.classList.remove('is-refreshing');
        void el.offsetWidth;
        el.classList.add('is-refreshing');

        el.textContent = prompt;

        var countEl = document.getElementById('outputCharCount');
        if (countEl) countEl.textContent = String(prompt.length);

        var classBadge = document.getElementById('classBadge');
        if (classBadge) classBadge.textContent = 'Grade ' + activeClassLevel;

        updateStickyCopyVisibility();
    }

    function setText(id, text) {
        if (!text) return;
        var element = document.getElementById(id);
        if (!element) return;
        element.textContent = text;
    }

    function applyCopyFromSot() {
        setText('heroTitle', COPY_TEXT.heroTitle);
        setText('heroSubtitle', COPY_TEXT.heroSubtitle);
        setText('heroCtaPrimary', COPY_TEXT.heroCtaPrimary);
        setText('heroCtaSecondary', COPY_TEXT.heroCtaSecondary);
        setText('heroCtaMeta', COPY_TEXT.heroCtaMeta);
    }

    /* ===== MODE SWITCHING ===== */

    function switchMode(newMode) {
        if (!MODES[newMode] || newMode === activeMode) return;

        activeMode = newMode;

        document.querySelectorAll('.mode-tab').forEach(function (tab) {
            var isTarget = tab.getAttribute('data-mode') === newMode;
            tab.classList.toggle('is-active', isTarget);
            tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
        });

        Object.keys(MODES).forEach(function (mode) {
            var panel = document.getElementById(MODES[mode].formId);
            if (panel) panel.hidden = mode !== newMode;
        });

        updateOutput();
    }

    function setupModeTabsKeyboard() {
        var tabs = Array.prototype.slice.call(document.querySelectorAll('.mode-tab'));
        if (!tabs.length) return;

        tabs.forEach(function (tab, index) {
            tab.addEventListener('keydown', function (e) {
                var targetIndex = index;
                if (e.key === 'ArrowRight') targetIndex = (index + 1) % tabs.length;
                else if (e.key === 'ArrowLeft') targetIndex = (index - 1 + tabs.length) % tabs.length;
                else if (e.key === 'Home') targetIndex = 0;
                else if (e.key === 'End') targetIndex = tabs.length - 1;
                else return;

                e.preventDefault();
                var targetTab = tabs[targetIndex];
                if (!targetTab) return;
                switchMode(targetTab.getAttribute('data-mode'));
                targetTab.focus();
            });
        });
    }

    /* ===== CLASS LEVEL ===== */

    function setClassLevel(level) {
        var normalized = String(level || '').trim();
        if (!/^(?:[1-9]|1[0-2])$/.test(normalized)) return;
        activeClassLevel = normalized;
        try { localStorage.setItem(CLASS_LEVEL_KEY, activeClassLevel); } catch (_) { /* ignore */ }
        updateOutput();
    }

    function setupClassLevelSelector() {
        var select = document.getElementById('classLevelSelect');
        if (!select) return;
        select.value = activeClassLevel;
        select.addEventListener('change', function () {
            setClassLevel(select.value);
        });
    }

    /* ===== FORM INPUT HANDLING ===== */

    function handleFormInput(e) {
        var field = e.target;
        var name = field.name;
        if (!name) return;

        if (formData[activeMode] && MODES[activeMode].fields.indexOf(name) !== -1) {
            formData[activeMode][name] = field.value;
            updateOutput();
        }
    }

    /* ===== SESSIONS ===== */

    function getSessions() {
        try {
            var raw = localStorage.getItem(SESSIONS_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (_) {
            return [];
        }
    }

    function saveSessions(sessions) {
        try {
            localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
        } catch (_) { /* ignore */ }
    }

    function saveSession() {
        var sessions = getSessions();

        var session = {
            id: Date.now(),
            mode: activeMode,
            classLevel: activeClassLevel,
            data: JSON.parse(JSON.stringify(formData[activeMode])),
            date: new Date().toLocaleString('en-US')
        };

        sessions.unshift(session);
        if (sessions.length > MAX_SESSIONS) sessions = sessions.slice(0, MAX_SESSIONS);

        saveSessions(sessions);
        renderSessions();
    }

    function loadSession(session) {
        if (!session || !session.mode || !MODES[session.mode]) return;

        switchMode(session.mode);

        if (session.classLevel) {
            setClassLevel(session.classLevel);
            var classSelect = document.getElementById('classLevelSelect');
            if (classSelect) classSelect.value = activeClassLevel;
        }

        if (session.data) {
            formData[session.mode] = JSON.parse(JSON.stringify(session.data));

            var formEl = document.getElementById(MODES[session.mode].formId);
            if (formEl) {
                MODES[session.mode].fields.forEach(function (fieldName) {
                    var input = formEl.querySelector('[name="' + fieldName + '"]');
                    if (input && session.data[fieldName] !== undefined) {
                        input.value = session.data[fieldName];
                    }
                });
            }
        }

        updateOutput();
    }

    function clearSessions() {
        var clearBtn = document.getElementById('sessionClearBtn');
        if (lastClearedSessions) {
            saveSessions(lastClearedSessions);
            lastClearedSessions = null;
            if (clearUndoTimer) {
                clearTimeout(clearUndoTimer);
                clearUndoTimer = null;
            }
            if (clearBtn) clearBtn.innerHTML = '<i data-lucide="trash-2" class="icon icon--sm"></i> Delete sessions';
            if (window.lucide && typeof window.lucide.createIcons === 'function' && clearBtn) {
                window.lucide.createIcons({ root: clearBtn });
            }
            renderSessions();
            showToastIfAvailable('Sessions restored.', 'success');
            return;
        }

        var sessions = getSessions();
        if (!sessions.length) {
            showToastIfAvailable('Session list is already empty.', 'error');
            return;
        }

        if (!window.confirm('Are you sure you want to delete all saved sessions?')) {
            return;
        }

        lastClearedSessions = sessions;
        try { localStorage.removeItem(SESSIONS_KEY); } catch (_) { /* ignore */ }
        renderSessions();
        if (clearBtn) clearBtn.innerHTML = '<i data-lucide="rotate-ccw" class="icon icon--sm"></i> Restore sessions';
        if (window.lucide && typeof window.lucide.createIcons === 'function' && clearBtn) {
            window.lucide.createIcons({ root: clearBtn });
        }
        showToastIfAvailable('Sessions deleted. Tap "Restore sessions" within 8s.', 'error');

        clearUndoTimer = setTimeout(function () {
            lastClearedSessions = null;
            clearUndoTimer = null;
            if (clearBtn) clearBtn.innerHTML = '<i data-lucide="trash-2" class="icon icon--sm"></i> Delete sessions';
            if (window.lucide && typeof window.lucide.createIcons === 'function' && clearBtn) {
                window.lucide.createIcons({ root: clearBtn });
            }
        }, CLEAR_SESSIONS_UNDO_MS);
    }

    function renderSessions() {
        var list = document.getElementById('sessionList');
        if (!list) return;

        var sessions = getSessions();

        list.innerHTML = '';

        if (sessions.length === 0) {
            var li = document.createElement('li');
            li.className = 'sessions-empty';
            li.id = 'sessionsEmpty';
            li.innerHTML =
                '<span class="sessions-empty-icon" aria-hidden="true">' +
                    '<i data-lucide="sparkles" class="icon icon--sm"></i>' +
                '</span>' +
                'No sessions yet. Save your first one.';
            list.appendChild(li);
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                window.lucide.createIcons({ root: list });
            }
            return;
        }

        sessions.forEach(function (session) {
            var li = document.createElement('li');
            li.className = 'session-item';
            li.setAttribute('role', 'button');
            li.setAttribute('tabindex', '0');
            li.setAttribute('aria-label', 'Load ' + (MODES[session.mode] ? MODES[session.mode].label : session.mode) + ' session from ' + session.date);

            li.innerHTML =
                '<div class="session-item-info">' +
                    '<span class="session-item-mode">' + escapeHtml(MODES[session.mode] ? MODES[session.mode].label : session.mode) + '</span>' +
                    '<span class="session-item-date">' + escapeHtml(session.date) + '</span>' +
                '</div>' +
                '<span class="session-item-load">Load \u2192</span>';

            li.addEventListener('click', function () { loadSession(session); });
            li.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    loadSession(session);
                }
            });

            list.appendChild(li);
        });

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons({ root: list });
        }
    }

    /* ===== LIBRARY ===== */

    function renderLibrary() {
        var grid = document.getElementById('libraryGrid');
        if (!grid) return;

        var countEl = document.getElementById('libraryTemplateCount');
        if (countEl) {
            countEl.textContent = LIBRARY_PROMPTS.length + ' templates';
        }

        grid.innerHTML = '';

        LIBRARY_PROMPTS.forEach(function (item) {
            var card = document.createElement('div');
            card.className = 'library-card';

            card.innerHTML =
                '<div class="library-card-header">' +
                    '<div class="library-card-icon"><i data-lucide="' + escapeHtml(item.icon) + '" class="icon icon--md"></i></div>' +
                    '<div>' +
                        '<div class="library-card-title">' + escapeHtml(item.title) + '</div>' +
                        '<div class="library-card-desc">' + escapeHtml(item.desc) + '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="library-card-prompt">' + escapeHtml(item.prompt) + '</div>' +
                '<div class="library-card-actions">' +
                    '<button type="button" class="library-btn library-btn--primary" data-library-apply="' + escapeHtml(item.id) + '">' +
                        '<i data-lucide="file-input" class="icon icon--sm"></i> Apply to form' +
                    '</button>' +
                    '<button type="button" class="library-btn" data-library-copy="' + escapeHtml(item.id) + '">' +
                        '<i data-lucide="copy" class="icon icon--sm"></i> Copy' +
                    '</button>' +
                '</div>' +
                '<p class="library-card-hint">Pastes into the "Main question for the AI" field \u2014 edit it in the form.</p>';

            grid.appendChild(card);
        });

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons({ root: grid });
        }

        grid.addEventListener('click', function (e) {
            var applyBtn = e.target.closest('[data-library-apply]');
            if (applyBtn) {
                var id = applyBtn.getAttribute('data-library-apply');
                applyLibraryPrompt(id);
                return;
            }

            var copyBtn = e.target.closest('[data-library-copy]');
            if (copyBtn) {
                var copyId = copyBtn.getAttribute('data-library-copy');
                copyLibraryPrompt(copyId);
            }
        });
    }

    function applyLibraryPrompt(id) {
        var item = LIBRARY_PROMPTS.find(function (p) { return p.id === id; });
        if (!item) return;

        var questionField = document.querySelector('#' + MODES[activeMode].formId + ' [name="question"]');
        if (questionField) {
            questionField.value = item.prompt;
            formData[activeMode].question = item.prompt;
            updateOutput();
            questionField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            questionField.focus();
            showToastIfAvailable('Template added to the question field. Edit it in the form.');
        }
    }

    function copyLibraryPrompt(id) {
        var item = LIBRARY_PROMPTS.find(function (p) { return p.id === id; });
        if (!item) return;
        copyTextWithFallback(item.prompt, 'Template copied.');
    }

    /* ===== RULES ===== */

    function renderRules() {
        var list = document.getElementById('rulesList');
        if (!list) return;

        list.innerHTML = '';

        RULES.forEach(function (rule) {
            var li = document.createElement('li');
            li.className = 'rules-item';
            li.innerHTML =
                '<i data-lucide="' + escapeHtml(rule.icon) + '" class="icon icon--md"></i>' +
                '<span>' + escapeHtml(rule.text) + '</span>';
            list.appendChild(li);
        });

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons({ root: list });
        }
    }

    /* ===== COPY ===== */

    function fallbackCopy(text) {
        var ta = document.getElementById('hiddenTextarea');
        if (!ta) return false;
        ta.style.position = 'fixed';
        ta.style.left = '0';
        ta.style.top = '0';
        ta.style.opacity = '0';
        ta.value = text;
        ta.focus();
        ta.select();
        var copied = false;
        try { copied = !!document.execCommand('copy'); } catch (_) { /* ignore */ }
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        ta.style.opacity = '0';
        return copied;
    }

    function tryNativeShare(text) {
        if (!navigator.share || typeof navigator.share !== 'function') {
            return Promise.resolve(false);
        }
        return navigator.share({
            title: 'AI prompt',
            text: text
        }).then(function () {
            return true;
        }).catch(function () {
            return false;
        });
    }

    function copyTextWithFallback(text, successMessage) {
        var okMessage = successMessage || 'Prompt copied.';
        var errorMessage = 'Couldn\'t copy. Select the text and copy it manually.';
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            navigator.clipboard.writeText(text).then(function () {
                showToastIfAvailable(okMessage, 'success');
            }).catch(function () {
                if (fallbackCopy(text)) {
                    showToastIfAvailable(okMessage, 'success');
                    return;
                }
                tryNativeShare(text).then(function (shared) {
                    if (shared) {
                        showToastIfAvailable('Share dialog opened.', 'success');
                        return;
                    }
                    showToastIfAvailable(errorMessage, 'error');
                });
            });
            return;
        }

        if (fallbackCopy(text)) {
            showToastIfAvailable(okMessage, 'success');
            return;
        }
        tryNativeShare(text).then(function (shared) {
            if (shared) {
                showToastIfAvailable('Share dialog opened.', 'success');
                return;
            }
            showToastIfAvailable(errorMessage, 'error');
        });
    }

    function showToastIfAvailable(message, status) {
        var toast = document.getElementById('toast');
        if (!toast) return;
        var msgEl = document.getElementById('toastMessage');
        if (msgEl) msgEl.textContent = message !== undefined ? message : 'Prompt copied.';
        var tone = status === 'error' ? 'error' : 'success';
        toast.classList.remove('is-success', 'is-error');
        toast.classList.add(tone === 'error' ? 'is-error' : 'is-success');
        toast.setAttribute('aria-label', tone === 'error' ? 'Error message' : 'Success message');
        var icon = toast.querySelector('.toast-icon .icon');
        if (icon) {
            icon.setAttribute('data-lucide', tone === 'error' ? 'alert-circle' : 'check');
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                window.lucide.createIcons({ root: toast });
            }
        }
        toast.classList.add('show');
        var progress = document.getElementById('toastProgress');
        if (progress) {
            progress.style.animation = 'none';
            void progress.offsetWidth;
            progress.style.animation = 'toastProgress 3000ms linear forwards';
        }
        setTimeout(function () { toast.classList.remove('show'); }, 3000);
    }

    function doCopyOutput() {
        var text = getGeneratedPrompt();
        copyTextWithFallback(text, 'Prompt copied.');
    }

    function openExternalTool(toolKey) {
        var rawUrl = AI_TOOL_URLS[toolKey];
        if (!rawUrl) return;

        var parsed;
        try {
            parsed = new URL(rawUrl);
        } catch (_) {
            return;
        }

        if (!AI_TOOL_ALLOWED_HOSTS[parsed.hostname]) return;
        window.open(parsed.toString(), '_blank', 'noopener,noreferrer');
    }

    function setupAiToolLaunchers() {
        document.querySelectorAll('[data-ai-tool]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var tool = btn.getAttribute('data-ai-tool');
                openExternalTool(tool);
            });
        });
    }

    /* ===== THEME ===== */

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem(THEME_KEY, theme); } catch (_) { /* ignore */ }
        var palette = THEME_TOKENS && THEME_TOKENS[theme];
        if (palette && typeof palette === 'object') {
            Object.keys(palette).forEach(function (key) {
                document.documentElement.style.setProperty(key, String(palette[key]));
            });
        }

        var icon = document.querySelector('#themeToggleBtn i');
        if (icon) {
            icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                window.lucide.createIcons({ root: document.getElementById('themeToggleBtn') });
            }
        }
        updateThemeToggleA11y(theme);
    }

    function updateThemeToggleA11y(theme) {
        var btn = document.getElementById('themeToggleBtn');
        if (!btn) return;
        var isDark = theme === 'dark';
        btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        btn.setAttribute('aria-label', isDark ? 'Toggle light mode' : 'Toggle dark mode');
        btn.setAttribute('title', 'Switch color mode');
    }

    function setupThemeToggle() {
        var btn = document.getElementById('themeToggleBtn');
        if (!btn) return;

        var initial = 'light';
        var storedTheme = null;
        try { storedTheme = localStorage.getItem(THEME_KEY); } catch (_) { /* ignore */ }
        if (storedTheme === 'light' || storedTheme === 'dark') {
            initial = storedTheme;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            initial = 'dark';
        }
        setTheme(initial);

        btn.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    /* ===== EXPOSE FOR COPY.JS ===== */

    window._getGeneratorPromptText = getGeneratedPrompt;
    window._getMiniPromptText = getGeneratedPrompt;

    /* ===== INIT ===== */
    function initializeApp() {
        // Restore class level
        try {
            var storedClassLevel = localStorage.getItem(CLASS_LEVEL_KEY);
            if (storedClassLevel) setClassLevel(storedClassLevel);
        } catch (_) { /* ignore */ }

        // Mode tabs
        document.querySelectorAll('.mode-tab').forEach(function (tab) {
            tab.addEventListener('click', function () {
                switchMode(tab.getAttribute('data-mode'));
            });
        });
        setupModeTabsKeyboard();

        // Class selector
        setupClassLevelSelector();

        // Form inputs
        document.querySelectorAll('.ops-form input, .ops-form select, .ops-form textarea').forEach(function (field) {
            field.addEventListener('input', handleFormInput);
            field.addEventListener('change', handleFormInput);
        });

        // Copy buttons
        var copyBtn = document.getElementById('outputCopyBtn');
        var copyCta = document.getElementById('outputCopyCta');
        var stickyCopy = document.getElementById('stickyCopyBtn');

        if (copyBtn) copyBtn.addEventListener('click', doCopyOutput);
        if (copyCta) copyCta.addEventListener('click', doCopyOutput);
        if (stickyCopy) stickyCopy.addEventListener('click', doCopyOutput);
        setupAiToolLaunchers();

        // Sessions
        var saveBtn = document.getElementById('sessionSaveBtn');
        var clearBtn = document.getElementById('sessionClearBtn');

        if (saveBtn) saveBtn.addEventListener('click', saveSession);
        if (clearBtn) clearBtn.addEventListener('click', clearSessions);

        // Render dynamic content
        renderLibrary();
        renderRules();
        renderSessions();

        // Theme
        setupThemeToggle();
        applyCopyFromSot();

        // Initial output
        updateOutput();
    }

    var PDF_PREVIEW_DEFS = {
        beginners: {
            title: 'Preview &mdash; Beginners: AI-Assisted Teaching Foundations',
            altPrefix: 'Beginners guide',
            pages: [2, 3, 4]
        },
        advanced: {
            title: 'Preview &mdash; Advanced: AI-Enhanced Instructional Design',
            altPrefix: 'Advanced guide',
            pages: [2, 3, 4]
        }
    };

    function escapeHtmlText(text) {
        return String(text == null ? '' : text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function initPdfGuideTocs(config) {
        if (!config || !config.pdfGuides || typeof config.pdfGuides !== 'object') return;
        Object.keys(config.pdfGuides).forEach(function (key) {
            var def = config.pdfGuides[key];
            if (!def || !Array.isArray(def.chapters)) return;
            var list = document.querySelector('[data-toc-list="' + key + '"]');
            var countEl = document.querySelector('[data-toc-count="' + key + '"]');
            if (countEl) {
                countEl.textContent = def.chapters.length + ' sections';
            }
            if (!list) return;
            var html = '';
            for (var i = 0; i < def.chapters.length; i += 1) {
                html += '<li>' + escapeHtmlText(def.chapters[i]) + '</li>';
            }
            list.innerHTML = html;
        });
    }

    function setHookText(selector, text) {
        if (typeof text !== 'string') return;
        var nodes = document.querySelectorAll(selector);
        for (var i = 0; i < nodes.length; i += 1) {
            nodes[i].textContent = text;
        }
    }

    function isPlaceholderStripeUrl(url) {
        return typeof url === 'string' && /YOUR_/.test(url);
    }

    function initCommerce(config) {
        if (!config || !config.commerce || typeof config.commerce !== 'object') return;
        var commerce = config.commerce;

        var links = commerce.stripePaymentLinks || {};
        var ctas = document.querySelectorAll('[data-stripe-cta]');
        for (var i = 0; i < ctas.length; i += 1) {
            var cta = ctas[i];
            var key = cta.getAttribute('data-stripe-cta');
            var url = key && Object.prototype.hasOwnProperty.call(links, key) ? links[key] : '';
            var placeholdersBlocked =
                commerce.allowPlaceholderCheckout === false && isPlaceholderStripeUrl(url);
            if (typeof url === 'string' && /^https:\/\//.test(url) && !placeholdersBlocked) {
                cta.setAttribute('href', url);
            } else if (placeholdersBlocked && typeof console !== 'undefined' && console.warn) {
                console.warn('Stripe payment link is still a placeholder for ' + key);
            }
        }

        if (commerce.pilotMeta) {
            setHookText('[data-commerce-pilot-meta]', commerce.pilotMeta);
        }
        if (commerce.testimonialsNote) {
            setHookText('[data-commerce-testimonials-note]', commerce.testimonialsNote);
        }
        if (commerce.deliveryPromise) {
            setHookText('[data-commerce-delivery-promise]', commerce.deliveryPromise);
        }

        var compare = commerce.compareStrip || {};
        if (compare.pdLabel) setHookText('[data-commerce-compare-pd-label]', compare.pdLabel);
        if (compare.pdValue) setHookText('[data-commerce-compare-pd-value]', compare.pdValue);
        if (compare.vsLabel) setHookText('[data-commerce-compare-vs]', compare.vsLabel);
        if (compare.beginnersLabel) setHookText('[data-commerce-compare-beginners-label]', compare.beginnersLabel);
        if (compare.advancedLabel) setHookText('[data-commerce-compare-advanced-label]', compare.advancedLabel);
        if (compare.caption) setHookText('[data-commerce-compare-caption]', compare.caption);

        var pricing = commerce.pricing || {};
        if (pricing.beginners && pricing.beginners.now) {
            setHookText('[data-commerce-compare-beginners-value]', pricing.beginners.now);
        }
        if (pricing.advanced && pricing.advanced.now) {
            setHookText('[data-commerce-compare-advanced-value]', pricing.advanced.now);
        }

        var list = document.querySelector('[data-commerce-testimonials]');
        if (list && Array.isArray(commerce.testimonials)) {
            var html = '';
            for (var j = 0; j < commerce.testimonials.length; j += 1) {
                var t = commerce.testimonials[j];
                if (!t || !t.quote) continue;
                var cite = t.cite ? '<cite>' + escapeHtmlText(t.cite) + '</cite>' : '';
                var meta = t.meta ? ' &middot; ' + escapeHtmlText(t.meta) : '';
                html +=
                    '<li class="pdf-testimonial">' +
                        '<blockquote><p>&ldquo;' + escapeHtmlText(t.quote) + '&rdquo;</p></blockquote>' +
                        '<footer>' + cite + meta + '</footer>' +
                    '</li>';
            }
            list.innerHTML = html;
        }
    }

    function initLegal(config) {
        if (!config || !config.legal || typeof config.legal !== 'object') return;
        if (config.legal.operatorLine) {
            setHookText('[data-legal-operator-line]', config.legal.operatorLine);
        }
    }

    /* Sticky mobile CTA: shows the visible card's CTA once both in-card CTAs scroll out. */
    function initPdfStickyCta() {
        if (typeof window === 'undefined' || typeof window.IntersectionObserver !== 'function') return;

        var bar = document.getElementById('pdfStickyCta');
        var link = document.getElementById('pdfStickyCtaLink');
        var label = document.getElementById('pdfStickyCtaLabel');
        var ctas = document.querySelectorAll('.pdf-guide-cta');
        if (!bar || !link || !label || ctas.length === 0) return;

        var mql = window.matchMedia('(max-width: 768px)');
        if (!mql.matches) return;

        var dialog = document.getElementById('pdfPreviewDialog');
        var visibleCount = 0;

        function syncFromCta(cta) {
            if (!cta) return;
            var href = cta.getAttribute('href');
            if (href) link.setAttribute('href', href);
            var stripeKey = cta.getAttribute('data-stripe-cta');
            link.setAttribute('data-stripe-cta', stripeKey || '');
            var aria = cta.getAttribute('aria-label');
            if (aria) link.setAttribute('aria-label', aria);
            var text = (cta.textContent || '').trim();
            if (text) label.textContent = text;
        }

        function show() {
            if (dialog && dialog.hasAttribute('open')) return;
            bar.hidden = false;
            window.requestAnimationFrame(function () {
                bar.classList.add('is-visible');
            });
        }

        function hide() {
            bar.classList.remove('is-visible');
            window.setTimeout(function () {
                if (!bar.classList.contains('is-visible')) bar.hidden = true;
            }, 250);
        }

        syncFromCta(ctas[0]);

        var observer = new window.IntersectionObserver(function (entries) {
            for (var i = 0; i < entries.length; i += 1) {
                var entry = entries[i];
                var wasVisible = entry.target.dataset.stickyVisible === '1';
                if (entry.isIntersecting && !wasVisible) {
                    visibleCount += 1;
                    entry.target.dataset.stickyVisible = '1';
                    syncFromCta(entry.target);
                } else if (!entry.isIntersecting && wasVisible) {
                    visibleCount = Math.max(0, visibleCount - 1);
                    entry.target.dataset.stickyVisible = '0';
                }
            }
            if (visibleCount > 0) hide();
            else show();
        }, { rootMargin: '0px 0px -120px 0px', threshold: 0.01 });

        for (var i = 0; i < ctas.length; i += 1) observer.observe(ctas[i]);

        if (dialog) {
            dialog.addEventListener('close', function () {
                if (visibleCount === 0) show();
            });
            var origShow = dialog.showModal && dialog.showModal.bind(dialog);
            if (origShow) {
                dialog.showModal = function () {
                    hide();
                    return origShow();
                };
            }
        }

        if (typeof mql.addEventListener === 'function') {
            mql.addEventListener('change', function (e) {
                if (!e.matches) {
                    bar.classList.remove('is-visible');
                    bar.hidden = true;
                }
            });
        }
    }

    function buildDigitalOfferExtras(currency, merchantListing) {
        var listing = merchantListing && typeof merchantListing === 'object' ? merchantListing : {};
        var returnDays = listing.returnPolicyDays || 14;
        var returnPolicyUrl = listing.returnPolicyUrl || 'https://promptanatomy.online/terms.html';
        return {
            shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                    '@type': 'MonetaryAmount',
                    value: '0',
                    currency: currency || 'USD'
                },
                shippingDestination: {
                    '@type': 'DefinedRegion',
                    addressCountry: 'US'
                },
                deliveryTime: {
                    '@type': 'ShippingDeliveryTime',
                    handlingTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 0,
                        maxValue: 0,
                        unitCode: 'DAY'
                    },
                    transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 0,
                        maxValue: 1,
                        unitCode: 'DAY'
                    }
                }
            },
            hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'US',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: returnDays,
                returnFees: 'https://schema.org/FreeReturn',
                returnPolicyUrl: returnPolicyUrl
            }
        };
    }

    /* SOT-driven Product + Offer JSON-LD for SERP rich results. */
    function initProductJsonLd(config) {
        var script = document.getElementById('product-jsonld');
        if (!script) return;
        if (!config || !config.commerce || typeof config.commerce !== 'object') return;
        var products = config.commerce.products;
        if (!products || typeof products !== 'object') return;

        var canonical = 'https://promptanatomy.online/';
        var canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink && canonicalLink.href) {
            canonical = canonicalLink.href;
        }
        var productUrl = canonical.replace(/#.*$/, '') + '#pdf-guides';
        var offerExtras = buildDigitalOfferExtras('USD', config.commerce.merchantListing);

        var graph = [];
        var keys = ['beginners', 'advanced'];
        for (var i = 0; i < keys.length; i += 1) {
            var key = keys[i];
            var p = products[key];
            if (!p || !p.name || !p.price) continue;
            var imageAbs = p.image && /^https?:/.test(p.image) ? p.image : canonical.replace(/\/$/, '') + (p.image || '');
            var productNode = {
                '@type': 'Product',
                '@id': canonical + '#product-' + key,
                name: p.name,
                image: imageAbs,
                sku: p.sku || (key + '-pdf'),
                category: p.category || 'Educational eBook',
                brand: { '@type': 'Brand', name: 'Prompt Anatomy' },
                offers: {
                    '@type': 'Offer',
                    price: String(p.price),
                    priceCurrency: p.currency || 'USD',
                    availability: 'https://schema.org/InStock',
                    url: productUrl,
                    shippingDetails: offerExtras.shippingDetails,
                    hasMerchantReturnPolicy: offerExtras.hasMerchantReturnPolicy
                }
            };
            if (p.description) productNode.description = p.description;
            graph.push(productNode);
        }

        if (graph.length === 0) return;
        var payload = { '@context': 'https://schema.org', '@graph': graph };
        try {
            script.textContent = JSON.stringify(payload, null, 2);
        } catch (_e) {
            /* leave the static fallback in place */
        }
    }

    function initBuyerFaq(config) {
        if (!config || !Array.isArray(config.buyerFaq)) return;
        var list = document.querySelector('[data-buyer-faq-list]');
        if (!list) return;
        var html = '';
        for (var i = 0; i < config.buyerFaq.length; i += 1) {
            var item = config.buyerFaq[i];
            if (!item || !item.q || !item.a) continue;
            var detailsId = item.id ? ' id="' + escapeHtmlText(item.id) + '"' : '';
            html +=
                '<li class="buyer-faq-item">' +
                '<details class="buyer-faq-details"' + detailsId + '>' +
                '<summary><span>' + escapeHtmlText(item.q) + '</span>' +
                '<i data-lucide="chevron-down" class="icon icon--sm buyer-faq-chevron" aria-hidden="true"></i>' +
                '</summary>' +
                '<p>' + escapeHtmlText(item.a) + '</p>' +
                '</details>' +
                '</li>';
        }
        list.innerHTML = html;
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }

    function initPdfPreviewDialog() {
        var dialog = document.getElementById('pdfPreviewDialog');
        if (!dialog || typeof dialog.showModal !== 'function') return;
        var titleEl = document.getElementById('pdfPreviewTitle');
        var pagesEl = document.getElementById('pdfPreviewPages');
        var closeBtn = document.getElementById('pdfPreviewClose');
        var backLink = document.getElementById('pdfPreviewBack');
        if (!titleEl || !pagesEl || !closeBtn) return;

        var triggers = document.querySelectorAll('[data-preview-trigger]');
        if (!triggers.length) return;

        var lastTrigger = null;

        function renderPages(productKey) {
            var def = PDF_PREVIEW_DEFS[productKey];
            if (!def) return;
            titleEl.innerHTML = def.title;
            var html = '';
            for (var i = 0; i < def.pages.length; i += 1) {
                var pageNum = def.pages[i];
                html +=
                    '<figure class="pdf-preview-page" role="listitem">' +
                    '<img src="/assets/pdf-covers/' + productKey + '-p' + pageNum + '.png"' +
                    ' alt="' + def.altPrefix + ', sample page ' + pageNum + ' (PREVIEW watermark)"' +
                    ' loading="lazy" decoding="async" width="734" height="950">' +
                    '<figcaption>Page ' + pageNum + '</figcaption>' +
                    '</figure>';
            }
            pagesEl.innerHTML = html;
        }

        function openFor(triggerEl) {
            var productKey = triggerEl.getAttribute('data-preview-trigger');
            if (!PDF_PREVIEW_DEFS[productKey]) return;
            renderPages(productKey);
            lastTrigger = triggerEl;
            dialog.showModal();
            window.requestAnimationFrame(function () {
                if (typeof closeBtn.focus === 'function') closeBtn.focus();
            });
        }

        function closeDialog() {
            if (dialog.open) dialog.close();
        }

        for (var t = 0; t < triggers.length; t += 1) {
            (function (el) {
                el.addEventListener('click', function (event) {
                    event.preventDefault();
                    openFor(el);
                });
            })(triggers[t]);
        }

        closeBtn.addEventListener('click', function () { closeDialog(); });
        if (backLink) {
            backLink.addEventListener('click', function () { closeDialog(); });
        }

        dialog.addEventListener('click', function (event) {
            var rect = dialog.getBoundingClientRect();
            if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            ) {
                closeDialog();
            }
        });

        dialog.addEventListener('close', function () {
            if (lastTrigger && typeof lastTrigger.focus === 'function') {
                lastTrigger.focus();
            }
            lastTrigger = null;
            pagesEl.innerHTML = '';
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var bootstrapConfig = cloneJson(DEFAULT_SOT);
        initCommerce(bootstrapConfig);
        initLegal(bootstrapConfig);
        initProductJsonLd(bootstrapConfig);

        loadSotConfig().then(function (config) {
            assignSotConfig(config);
            initFormData();
            initCommerce(config);
            initLegal(config);
            initProductJsonLd(config);
            initializeApp();
            initPdfPreviewDialog();
            initPdfGuideTocs(config);
            initBuyerFaq(config);
            initPdfStickyCta();
        });
    });
})();
