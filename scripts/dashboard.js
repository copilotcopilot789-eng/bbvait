document.addEventListener('DOMContentLoaded', function () {
    const DEFAULT_BALANCE =1795000 ;
    const STORAGE_PREFIX = 'sg-account-';
    const accountStatus = sessionStorage.getItem('accountStatus');
    const username = sessionStorage.getItem('username');

    if (accountStatus !== 'active' || !username) {
        window.location.href = 'index.html';
        return;
    }

    const userFullName = '  Mélanie Tausha';
    sessionStorage.setItem('userFullName', userFullName);
    const clientNumber = sessionStorage.getItem('clientNumber') || username;
    const balanceKey = STORAGE_PREFIX + clientNumber + '-balance-v2';
    const transfersKey = STORAGE_PREFIX + clientNumber + '-transfers-v2';
    let balance = readBalance();
    let transfers = readTransfers();
    let selectedTransaction = null;

    const balanceElement = document.getElementById('main-balance');
    const transferBalanceElement = document.getElementById('transfer-balance');
    const transferModal = document.getElementById('transfer-modal');
    const receiptModal = document.getElementById('receipt-modal');
    const transferForm = document.getElementById('transfer-form');
    const transferError = document.getElementById('transfer-error');
    const transactionsList = document.querySelector('.transactions-list');
    const dashboardActionModal = document.getElementById('dashboard-action-modal');

    document.getElementById('user-name').textContent = userFullName;
    document.getElementById('account-last-digits').textContent = clientNumber.slice(-4);
    document.querySelectorAll('.card-name').forEach(function (name) {
        name.textContent = userFullName.toUpperCase();
    });
    renderBalance();
    renderSavedTransfers();

    function readBalance() {
        const savedValue = localStorage.getItem(balanceKey);
        const saved = savedValue === null ? NaN : Number(savedValue);
        if (Number.isFinite(saved) && saved >= 0) return saved;
        return DEFAULT_BALANCE;
    }

    function readTransfers() {
        try {
            const saved = JSON.parse(localStorage.getItem(transfersKey) || '[]');
            return Array.isArray(saved) ? saved.filter(isValidTransfer) : [];
        } catch (error) {
            return [];
        }
    }

    function isValidTransfer(item) {
        return item && typeof item.id === 'string' && typeof item.beneficiary === 'string' &&
            typeof item.reference === 'string' && typeof item.createdAt === 'string' &&
            !Number.isNaN(Date.parse(item.createdAt)) && Number.isFinite(Number(item.amount)) && Number(item.amount) > 0;
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount);
    }

    function formatDate(value) {
        return new Intl.DateTimeFormat('it-IT', {
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(new Date(value));
    }

    function renderBalance() {
        const formatted = formatCurrency(balance);
        balanceElement.textContent = formatted;
        transferBalanceElement.textContent = formatted;
        sessionStorage.setItem('accountBalance', balance.toFixed(2));
    }

    function renderSavedTransfers() {
        transfers.forEach(function (transfer) {
            transactionsList.prepend(createTransactionElement(transfer));
        });
    }

    function createTransactionElement(transfer) {
        const item = document.createElement('div');
        item.className = 'transaction-item expense';
        item.dataset.type = 'virement';
        item.dataset.transactionId = transfer.id;

        const icon = document.createElement('div');
        icon.className = 'transaction-icon';
        icon.innerHTML = '<i class="fas fa-paper-plane"></i>';

        const details = document.createElement('div');
        details.className = 'transaction-details';
        const name = document.createElement('span');
        name.className = 'transaction-name';
        name.textContent = 'Virement vers ' + transfer.beneficiary;
        const date = document.createElement('span');
        date.className = 'transaction-date';
        date.textContent = formatDate(transfer.createdAt) + ' · ' + transfer.reference;
        details.append(name, date);

        const amount = document.createElement('div');
        amount.className = 'transaction-amount negative';
        amount.textContent = '-' + formatCurrency(transfer.amount);

        const button = document.createElement('button');
        button.className = 'transaction-btn';
        button.type = 'button';
        button.dataset.action = 'details-transaction';
        button.setAttribute('aria-label', 'Voir le reçu du virement');
        button.innerHTML = '<i class="fas fa-chevron-right"></i>';
        item.append(icon, details, amount, button);
        return item;
    }

    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        if (!document.querySelector('.modal-overlay.active')) document.body.style.overflow = '';
    }

    function openDashboardActionNotice() {
        dashboardActionModal.classList.add('active');
        dashboardActionModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        dashboardActionModal.querySelector('[data-dashboard-modal-close]').focus();
    }

    function closeDashboardActionNotice() {
        closeModal(dashboardActionModal);
    }

    function openTransfer() {
        transferError.textContent = '';
        renderBalance();
        openModal(transferModal);
        setTimeout(function () { document.getElementById('beneficiary-name').focus(); }, 50);
    }

    function normaliseIban(value) {
        return value.replace(/\s/g, '').toUpperCase();
    }

    function isValidIban(value) {
        const iban = normaliseIban(value);
        if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) return false;
        const rearranged = iban.slice(4) + iban.slice(0, 4);
        let remainder = 0;
        for (const character of rearranged) {
            const digits = /[A-Z]/.test(character) ? String(character.charCodeAt(0) - 55) : character;
            for (const digit of digits) remainder = (remainder * 10 + Number(digit)) % 97;
        }
        return remainder === 1;
    }

    transferForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const beneficiary = transferForm.elements.beneficiaryName.value.trim();
        const iban = normaliseIban(transferForm.elements.iban.value);
        const amount = Math.round(Number(transferForm.elements.amount.value) * 100) / 100;
        const reference = transferForm.elements.reference.value.trim();

        if (!beneficiary || !reference || !Number.isFinite(amount) || amount <= 0) {
            transferError.textContent = 'Veuillez compléter tous les champs avec un montant valide.';
            return;
        }
        if (!isValidIban(iban)) {
            transferError.textContent = 'L’IBAN saisi n’est pas valide.';
            return;
        }
        if (amount > balance) {
            transferError.textContent = 'Solde insuffisant pour effectuer ce virement.';
            return;
        }

        const submitButton = transferForm.querySelector('[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';

        window.setTimeout(function () {
            const transfer = {
                id: 'VIR-' + Date.now().toString(36).toUpperCase(),
                beneficiary: beneficiary,
                iban: iban,
                amount: amount,
                reference: reference,
                createdAt: new Date().toISOString(),
                status: 'executed'
            };
            balance = Math.round((balance - amount) * 100) / 100;
            transfers.push(transfer);
            localStorage.setItem(balanceKey, String(balance));
            localStorage.setItem(transfersKey, JSON.stringify(transfers));
            renderBalance();
            transactionsList.prepend(createTransactionElement(transfer));
            transferForm.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-check"></i> Confirmer le virement';
            closeModal(transferModal);
            showReceipt(transfer, false);
            showNotification('Virement effectué et solde mis à jour.', 'success');
        }, 650);
    });

    function maskIban(iban) {
        if (!iban) return 'Non disponible';
        return iban.slice(0, 4) + ' •••• •••• •••• ' + iban.slice(-4);
    }

    function showReceipt(transfer, isDetail) {
        selectedTransaction = transfer;
        document.getElementById('receipt-title').textContent = isDetail ? 'Détail du virement' : 'Virement effectué';
        document.getElementById('receipt-subtitle').textContent = isDetail ? 'Cette opération a été exécutée.' : 'Votre opération a bien été enregistrée.';
        document.getElementById('receipt-id').textContent = transfer.id;
        document.getElementById('receipt-date').textContent = formatDate(transfer.createdAt);
        document.getElementById('receipt-beneficiary').textContent = transfer.beneficiary;
        document.getElementById('receipt-iban').textContent = maskIban(transfer.iban);
        document.getElementById('receipt-reference').textContent = transfer.reference;
        document.getElementById('receipt-amount').textContent = formatCurrency(transfer.amount);
        openModal(receiptModal);
    }

    function showStaticTransactionDetail(item) {
        const name = item.querySelector('.transaction-name').textContent;
        const date = item.querySelector('.transaction-date').textContent;
        const amountText = item.querySelector('.transaction-amount').textContent;
        selectedTransaction = null;
        document.getElementById('receipt-title').textContent = 'Détail de l’opération';
        document.getElementById('receipt-subtitle').textContent = name;
        document.getElementById('receipt-id').textContent = 'Opération enregistrée';
        document.getElementById('receipt-date').textContent = date;
        document.getElementById('receipt-beneficiary').textContent = name;
        document.getElementById('receipt-iban').textContent = '—';
        document.getElementById('receipt-reference').textContent = item.dataset.type || 'opération';
        document.getElementById('receipt-amount').textContent = amountText;
        openModal(receiptModal);
    }

    function filterTransactions(filter) {
        document.querySelectorAll('.filter-btn').forEach(function (button) {
            button.classList.toggle('active', button.dataset.filter === filter);
        });
        document.querySelectorAll('.transaction-item').forEach(function (item) {
            const visible = filter === 'all' ||
                (filter === 'virements' && item.dataset.type === 'virement') ||
                (filter === 'cartes' && item.dataset.type === 'carte') ||
                (filter === 'prelevements' && item.dataset.type === 'prelevement');
            item.style.display = visible ? 'flex' : 'none';
        });
    }

    document.addEventListener('click', function (event) {
        const actionElement = event.target.closest('button, a[data-action], a#logout-btn');
        if (!actionElement || actionElement.closest('#dashboard-action-modal')) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        openDashboardActionNotice();
    }, true);

    dashboardActionModal.addEventListener('click', function (event) {
        if (event.target === dashboardActionModal) {
            closeDashboardActionNotice();
            return;
        }

        if (event.target.closest('[data-dashboard-modal-close]')) closeDashboardActionNotice();
    });

    document.addEventListener('click', function (event) {
        const closeButton = event.target.closest('[data-close-modal]');
        if (closeButton) {
            closeModal(closeButton.closest('.modal-overlay'));
            return;
        }
        if (event.target.classList.contains('modal-overlay')) {
            closeModal(event.target);
            return;
        }

        const filterButton = event.target.closest('.filter-btn');
        if (filterButton) {
            filterTransactions(filterButton.dataset.filter);
            return;
        }

        const actionElement = event.target.closest('[data-action]');
        if (!actionElement) return;
        event.preventDefault();
        const action = actionElement.dataset.action;

        if (action === 'virement' || action === 'virements') openTransfer();
        else if (action === 'operations' || action === 'comptes' || action === 'synthese') {
            document.querySelector('.transactions-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (action === 'details-transaction') {
            const item = actionElement.closest('.transaction-item');
            const transfer = transfers.find(function (entry) { return entry.id === item.dataset.transactionId; });
            transfer ? showReceipt(transfer, true) : showStaticTransactionDetail(item);
        } else if (action === 'load-more') {
            showNotification('Toutes les opérations disponibles sont affichées.', 'info');
        } else if (action === 'retirer' || action === 'deposer') {
            showNotification('La gestion de l’épargne sera bientôt disponible.', 'info');
        } else if (action === 'bloquer-carte') {
            showNotification('Pour votre sécurité, confirmez cette action auprès de votre conseiller.', 'info');
        } else {
            showNotification('Cette rubrique sera bientôt disponible.', 'info');
        }
    });

    document.getElementById('print-receipt').addEventListener('click', function () {
        receiptModal.classList.add('print-receipt');
        window.print();
        receiptModal.classList.remove('print-receipt');
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && dashboardActionModal.classList.contains('active')) {
            closeDashboardActionNotice();
            return;
        }
        if (event.key === 'Escape') document.querySelectorAll('.modal-overlay.active').forEach(closeModal);
    });

    document.getElementById('logout-btn').addEventListener('click', function (event) {
        event.preventDefault();
        if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    });

    function showNotification(message, type) {
        document.querySelectorAll('.notification-toast').forEach(function (toast) { toast.remove(); });
        const notification = document.createElement('div');
        notification.className = 'notification-toast ' + (type || 'info');
        const icon = document.createElement('i');
        icon.className = 'fas ' + (type === 'success' ? 'fa-check-circle' : 'fa-info-circle');
        const text = document.createElement('span');
        text.textContent = message;
        notification.append(icon, text);
        document.body.appendChild(notification);
        window.setTimeout(function () { notification.remove(); }, 3500);
    }
});
