// ===================================
// OPMC Website Interactive Scripts
// ===================================

// Utility: Throttle function
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// 1. SMOOTH SCROLLING
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// 2. NAVBAR SCROLL BEHAVIOR
// ===================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    const sections = document.querySelectorAll('.section[id]');

    // Add scrolled class
    const handleScroll = throttle(() => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active section
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - navbar.offsetHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
}

// ===================================
// 3. INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
function initScrollAnimations() {
    // Scroll animations disabled per user request
    // All cards now display immediately without fade-in effects
}

// ===================================
// 4. FAQ ACCORDION
// ===================================
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    const expandAllBtn = document.getElementById('expand-all');
    const collapseAllBtn = document.getElementById('collapse-all');

    // Toggle individual FAQ
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Expand all
    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', () => {
            faqItems.forEach(item => item.classList.add('active'));
        });
    }

    // Collapse all
    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', () => {
            faqItems.forEach(item => item.classList.remove('active'));
        });
    }
}

// ===================================
// 5. MEMBER TABS, SEARCH & PAGINATION
// ===================================
function initMemberSearch() {
    const searchInput = document.getElementById('member-search');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Fix member card structure - wrap name and school in member-info div
    document.querySelectorAll('.member').forEach(member => {
        const nameSpan = member.querySelector('.name');
        const schoolSpan = member.querySelector('.school');
        const br = member.querySelector('br');

        if (nameSpan && schoolSpan && !member.querySelector('.member-info')) {
            const infoDiv = document.createElement('div');
            infoDiv.className = 'member-info';
            infoDiv.appendChild(nameSpan.cloneNode(true));
            infoDiv.appendChild(schoolSpan.cloneNode(true));

            // Remove old elements
            if (br) br.remove();
            nameSpan.remove();
            schoolSpan.remove();

            // Add new structure
            member.appendChild(infoDiv);
        }
    });

    // Pagination state
    let currentTab = 'senior';
    const pagination = {
        senior: {
            currentPage: 1,
            itemsPerPage: 8, // 2 rows × 4 items per row
            allMembers: [],
            filteredMembers: []
        },
        regular: {
            currentPage: 1,
            itemsPerPage: 8,
            allMembers: [],
            filteredMembers: []
        }
    };

    // Get all members
    const seniorContainer = document.getElementById('senior-authors');
    const regularContainer = document.getElementById('regular-authors');

    if (seniorContainer) {
        pagination.senior.allMembers = Array.from(seniorContainer.querySelectorAll('.member'));
        pagination.senior.filteredMembers = [...pagination.senior.allMembers];
    }

    if (regularContainer) {
        pagination.regular.allMembers = Array.from(regularContainer.querySelectorAll('.member'));
        pagination.regular.filteredMembers = [...pagination.regular.allMembers];
    }

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');

            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`tab-${tabName}`).classList.add('active');

            // Update current tab
            currentTab = tabName;

            // Reset to page 1 and render
            pagination[currentTab].currentPage = 1;
            renderPagination();
        });
    });

    function filterMembers() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        function checkMember(member) {
            const name = member.querySelector('.name').textContent.toLowerCase();
            const school = member.querySelector('.school').textContent.toLowerCase();
            return name.includes(searchTerm) || school.includes(searchTerm);
        }

        // Filter both tabs
        pagination.senior.filteredMembers = pagination.senior.allMembers.filter(checkMember);
        pagination.senior.currentPage = 1;

        pagination.regular.filteredMembers = pagination.regular.allMembers.filter(checkMember);
        pagination.regular.currentPage = 1;

        renderPagination();
    }

    function renderPagination() {
        const state = pagination[currentTab];
        const container = document.getElementById(`${currentTab}-authors`);
        const paginationContainer = document.getElementById('members-pagination');
        const paginationInfo = document.getElementById('members-pagination-info');

        if (!container || !paginationContainer) return;

        const totalPages = Math.ceil(state.filteredMembers.length / state.itemsPerPage);
        const startIndex = (state.currentPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;

        // Hide all members
        state.allMembers.forEach(member => {
            member.style.display = 'none';
        });

        // Show current page members
        state.filteredMembers.slice(startIndex, endIndex).forEach(member => {
            member.style.display = '';
        });

        // Update pagination info
        if (paginationInfo) {
            const showing = state.filteredMembers.length === 0 ? 0 : startIndex + 1;
            const to = Math.min(endIndex, state.filteredMembers.length);
            paginationInfo.textContent = `Showing ${showing}-${to} of ${state.filteredMembers.length} members`;
        }

        // Render pagination controls
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let html = `
            <button class="pagination-btn" onclick="changePage(${state.currentPage - 1})" ${state.currentPage === 1 ? 'disabled' : ''}>
                Previous
            </button>
            <div class="pagination-numbers">
        `;

        // Show page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= state.currentPage - 1 && i <= state.currentPage + 1)
            ) {
                html += `
                    <button class="pagination-btn ${i === state.currentPage ? 'active' : ''}"
                            onclick="changePage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === state.currentPage - 2 || i === state.currentPage + 2) {
                html += `<span style="padding: 0.5rem;">...</span>`;
            }
        }

        html += `
            </div>
            <button class="pagination-btn" onclick="changePage(${state.currentPage + 1})" ${state.currentPage === totalPages ? 'disabled' : ''}>
                Next
            </button>
        `;

        paginationContainer.innerHTML = html;
    }

    // Make changePage function global
    window.changePage = function(page) {
        const state = pagination[currentTab];
        const totalPages = Math.ceil(state.filteredMembers.length / state.itemsPerPage);

        if (page < 1 || page > totalPages) return;

        state.currentPage = page;
        renderPagination();

        // Scroll to members section
        const section = document.getElementById('members');
        if (section) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = section.offsetTop - navbarHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    if (searchInput) {
        searchInput.addEventListener('input', filterMembers);
    }

    // Initial render
    renderPagination();
}

// ===================================
// 6. MOBILE MENU TOGGLE
// ===================================
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (toggle) {
        toggle.addEventListener('click', () => {
            navbar.classList.toggle('mobile-menu-open');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('mobile-menu-open');
            });
        });
    }
}

// ===================================
// INITIALIZE ALL
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initNavbarScroll();
    initScrollAnimations();
    initFAQAccordion();
    initMemberSearch();
    initMobileMenu();

    console.log('OPMC Website initialized successfully');
});
