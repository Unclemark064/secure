
   
        // Wallet addresses (replace with your actual addresses)
        const walletAddresses = {
            btc: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
            usdt: '0x742d35Cc6634C0532925a3b8D904ad682a2dcC3c'
        };

        // Cryptocurrency information
        const cryptoInfo = {
            btc: {
                name: 'Bitcoin (BTC)',
                minDeposit: '0.001 BTC',
                confirmations: '3',
                processingTime: '15-30 minutes'
            },
            usdt: {
                name: 'Tether (USDT)',
                minDeposit: '10 USDT',
                confirmations: '12',
                processingTime: '10-20 minutes'
            }
        };

        function showWalletAddress() {
            const cryptoMethod = document.getElementById('crypto-method').value;
            const walletSection = document.getElementById('wallet-section');
            const walletAddress = document.getElementById('wallet-address');
            const walletLabel = document.getElementById('wallet-label');
            const depositBtn = document.getElementById('deposit-btn');

            if (cryptoMethod) {
                const info = cryptoInfo[cryptoMethod];
                walletSection.style.display = 'block';
                walletAddress.value = walletAddresses[cryptoMethod];
                walletLabel.textContent = `${info.name} Wallet Address`;
                
                // Update info box
                document.getElementById('crypto-name').textContent = info.name;
                document.getElementById('min-deposit').textContent = info.minDeposit;
                document.getElementById('confirmations').textContent = info.confirmations;
                document.getElementById('processing-time').textContent = info.processingTime;
                
                depositBtn.disabled = false;
            } else {
                walletSection.style.display = 'none';
                depositBtn.disabled = true;
            }
        }

        function copyWalletAddress() {
            const walletAddress = document.getElementById('wallet-address');
            const copyBtn = document.querySelector('.copy-btn');
            
            walletAddress.select();
            walletAddress.setSelectionRange(0, 99999);
            
            navigator.clipboard.writeText(walletAddress.value).then(() => {
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                    copyBtn.classList.remove('copied');
                }, 2000);
                
                showAlert('Wallet address copied to clipboard!', 'success');
            }).catch(err => {
                showAlert('Failed to copy wallet address', 'danger');
            });
        }

        function handleFileUpload(input) {
            const file = input.files[0];
            const fileInfo = document.getElementById('file-info');
            const fileName = document.getElementById('file-name');
            const uploadText = document.getElementById('upload-text');
            
            if (file) {
                // Check file size (5MB limit)
                if (file.size > 5 * 1024 * 1024) {
                    showAlert('File size must be less than 5MB', 'danger');
                    input.value = '';
                    return;
                }
                
                // Check file type
                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
                if (!allowedTypes.includes(file.type)) {
                    showAlert('Only JPG, PNG, and PDF files are allowed', 'danger');
                    input.value = '';
                    return;
                }
                
                fileName.textContent = file.name;
                fileInfo.style.display = 'block';
                uploadText.innerHTML = '<i class="fas fa-check-circle"></i> File uploaded successfully';
            }
        }

        function removeFile() {
            const fileInput = document.getElementById('receipt-upload');
            const fileInfo = document.getElementById('file-info');
            const uploadText = document.getElementById('upload-text');
            
            fileInput.value = '';
            fileInfo.style.display = 'none';
            uploadText.innerHTML = 'Click to upload receipt or screenshot';
        }

        function resetForm() {
            document.getElementById('crypto-deposit-form').reset();
            document.getElementById('wallet-section').style.display = 'none';
            document.getElementById('file-info').style.display = 'none';
            document.getElementById('upload-text').innerHTML = 'Click to upload receipt or screenshot';
            document.getElementById('deposit-btn').disabled = true;
            document.getElementById('status-card').style.display = 'none';
        }

        function generateReferenceId() {
            return 'DEP' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
        }

        function showAlert(message, type) {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type}`;
            alertDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : 'times'}-circle"></i> ${message}`;
            
            const container = document.querySelector('.container');
            container.insertBefore(alertDiv, container.firstChild);
            
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.parentNode.removeChild(alertDiv);
                }
            }, 5000);
        }

        // Form submission handler
        document.getElementById('crypto-deposit-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cryptoMethod = document.getElementById('crypto-method').value;
            const depositAmount = document.getElementById('deposit-amount').value;
            const transactionHash = document.getElementById('transaction-hash').value;
            const receiptFile = document.getElementById('receipt-upload').files[0];
            const depositNote = document.getElementById('deposit-note').value;
            
            if (!cryptoMethod) {
                showAlert('Please select a cryptocurrency', 'danger');
                return;
            }
            
            // Generate reference ID
            const referenceId = generateReferenceId();
            document.getElementById('reference-id').textContent = referenceId;
            
            // Show status card
            document.getElementById('status-card').style.display = 'block';
            document.getElementById('status-card').scrollIntoView({ behavior: 'smooth' });
            
            // Show success message
            const cryptoName = cryptoInfo[cryptoMethod].name;
            showAlert(`Your ${cryptoName} deposit request has been submitted successfully!`, 'success');
            
            // Reset form
            setTimeout(() => {
                resetForm();
            }, 3000);
        });

       