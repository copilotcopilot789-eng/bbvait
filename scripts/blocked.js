document.addEventListener('DOMContentLoaded', function() {
    const unblockBtn = document.getElementById('unblock-btn');
    const modal = document.getElementById('unblock-modal');
    const closeModal = document.querySelector('.close-modal');
    const unblockForm = document.getElementById('unblock-form');
    
    // Check if user came from blocked account
    const accountStatus = sessionStorage.getItem('accountStatus');
    const username = sessionStorage.getItem('username');
    
    // Set blocked account info
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR') + ' - ' + now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('block-date').textContent = dateStr;
    
    // Open modal
    unblockBtn.addEventListener('click', function() {
        modal.classList.add('active');
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Handle unblock form submission
    unblockForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Vérification...';
        submitBtn.disabled = true;
        
        // Simulate verification process
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Demande envoyée';
            
            setTimeout(() => {
                modal.classList.remove('active');
                showSuccessMessage();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                unblockForm.reset();
            }, 1500);
        }, 2000);
    });
    
    // Show success message
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                text-align: center;
                z-index: 10000;
                max-width: 400px;
                animation: scaleIn 0.3s ease-out;
            ">
                <i class="fas fa-check-circle" style="font-size: 64px; color: #28a745; margin-bottom: 20px;"></i>
                <h3 style="font-size: 24px; color: #333; margin-bottom: 15px;">Demande envoyée !</h3>
                <p style="color: #666; margin-bottom: 25px;">
                    Votre demande de déblocage a été transmise à nos services.
                    Vous recevrez une réponse dans les 24 heures.
                </p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    padding: 12px 30px;
                    background: linear-gradient(135deg, #E60028 0%, #c00020 100%);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-weight: 600;
                    cursor: pointer;
                ">
                    Fermer
                </button>
            </div>
        `;
        
        // Add overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        `;
        overlay.onclick = () => {
            successDiv.remove();
            overlay.remove();
        };
        
        document.body.appendChild(overlay);
        document.body.appendChild(successDiv);
    }
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scaleIn {
            from {
                transform: translate(-50%, -50%) scale(0.8);
                opacity: 0;
            }
            to {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Find agency button
    const findAgencyBtn = document.querySelector('.btn-secondary');
    if (findAgencyBtn) {
        findAgencyBtn.addEventListener('click', function() {
            const agencies = `
                📍 Agences Société Générale les plus proches :
                
                1. SG Paris Centre
                   29 Boulevard Haussmann, 75009 Paris
                   Ouvert : Lun-Ven 9h-18h
                   Distance : 2.3 km
                
                2. SG Paris Opéra
                   12 Rue Auber, 75009 Paris
                   Ouvert : Lun-Ven 9h-17h30
                   Distance : 2.7 km
                
                3. SG Paris République
                   45 Boulevard du Temple, 75011 Paris
                   Ouvert : Lun-Ven 9h-18h
                   Distance : 3.1 km
            `;
            alert(agencies);
        });
    }
    
    // Phone number click
    const phoneNumber = document.querySelector('.phone-number');
    if (phoneNumber) {
        phoneNumber.addEventListener('click', function(e) {
            if (!('ontouchstart' in window)) {
                e.preventDefault();
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #E60028;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                    z-index: 10000;
                    animation: slideInRight 0.3s ease-out;
                `;
                notification.textContent = 'Numéro copié : 09 69 36 96 96';
                document.body.appendChild(notification);
                
                // Copy to clipboard
                navigator.clipboard.writeText('0969369696');
                
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            }
        });
    }
    
    // Add slide animation
    const slideStyle = document.createElement('style');
    slideStyle.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(slideStyle);
});
