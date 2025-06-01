class ContactForm {
            constructor() {
                this.form = document.getElementById('contactForm');
                this.messageDiv = document.getElementById('message');
                this.loadingDiv = document.getElementById('loading');
                this.captchaDisplay = document.getElementById('captchaDisplay');
                this.captchaInput = document.getElementById('captchaInput');
                this.refreshBtn = document.getElementById('refreshCaptcha');
                this.submitBtn = document.getElementById('submitBtn');
                
                this.currentCaptcha = '';
                
                this.init();
            }
            
            init() {
                this.generateCaptcha();
                this.bindEvents();
            }
            
            bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.refreshBtn.addEventListener('click', () => this.generateCaptcha());
}
            
            generateCaptcha() {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                this.currentCaptcha = '';
                for (let i = 0; i < 6; i++) {
                    this.currentCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                this.captchaDisplay.textContent = this.currentCaptcha;
                this.captchaInput.value = '';
            }
            
            validateField(field) {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                    return false;
                } else if (field.type === 'email' && field.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        field.style.borderColor = '#e74c3c';
                        return false;
                    }
                }
                field.style.borderColor = '#2ecc71';
                return true;
            }
            
            validateForm() {
    const requiredFields = this.form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
        }
    });
    
    
    if (this.captchaInput.value.toUpperCase() !== this.currentCaptcha) {
        isValid = false;
    }
    
    return isValid;
}
            
            showMessage(text, type) {
                this.messageDiv.textContent = text;
                this.messageDiv.className = `message ${type}`;
                this.messageDiv.style.display = 'block';
                
                setTimeout(() => {
                    this.messageDiv.style.display = 'none';
                }, 5000);
            }
            
            showLoading(show) {
                this.loadingDiv.style.display = show ? 'block' : 'none';
                this.submitBtn.disabled = show;
            }
            
            handleSubmit(e) {
                e.preventDefault();
                
                if (!this.validateForm()) {
                    this.showMessage('Please fill in all required fields correctly.', 'error');
                    return;
                }
                
                this.showLoading(true);
                
                const formData = new FormData(this.form);
                formData.append('captcha_verification', this.currentCaptcha);
                
                const xhr = new XMLHttpRequest();
                
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        this.showLoading(false);
                        
                        if (xhr.status === 200) {
                            try {
                                const response = JSON.parse(xhr.responseText);
                                
                                if (response.success) {
                                    this.showMessage(response.message, 'success');
                                    this.form.reset();
                                    this.generateCaptcha();
                                    
                                    
                                    const fields = this.form.querySelectorAll('input, select, textarea');
                                    fields.forEach(field => {
                                        field.style.borderColor = '#e0e0e0';
                                    });
                                } else {
                                    this.showMessage(response.message, 'error');
                                    if (response.regenerate_captcha) {
                                        this.generateCaptcha();
                                    }
                                }
                            } catch (error) {
                                this.showMessage('An error occurred while processing your request.', 'error');
                            }
                        } else {
                            this.showMessage('Server error. Please try again later.', 'error');
                        }
                    }
                };
                
                xhr.open('POST', '../../CONTROLLER/contact_process.php', true);
                xhr.send(formData);
            }
        }
        
        
        document.addEventListener('DOMContentLoaded', () => {
            new ContactForm();
        });