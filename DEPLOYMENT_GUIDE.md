# LobeChat Deployment Guide

This guide will help you deploy LobeChat using PM2, Nginx, Node.js, pnpm, and GitHub on an Ubuntu server.

## 📋 Prerequisites

- Ubuntu 20.04+ server
- Domain name (optional but recommended)
- SSH access to your server
- Basic knowledge of Linux commands

## 🚀 Quick Start

### Option 1: Automated Deployment (Recommended)

1. **Upload the deployment files to your server:**

   ```bash
   scp deploy.sh ecosystem.config.js nginx.conf env.example your-server:/home/username/
   ```

2. **SSH into your server:**

   ```bash
   ssh username@your-server-ip
   ```

3. **Make the script executable and run it:**

   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

4. **Follow the prompts to complete the setup**

### Option 2: Manual Deployment

Follow the step-by-step manual instructions below.

## 📝 Manual Deployment Steps

### Step 1: Server Setup

1. **Update your system:**

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Node.js (LTS version):**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install pnpm:**

   ```bash
   npm install -g pnpm
   ```

4. **Install PM2:**

   ```bash
   npm install -g pm2
   ```

5. **Install Nginx:**

   ```bash
   sudo apt install nginx -y
   ```

6. **Install other dependencies:**
   ```bash
   sudo apt install git curl build-essential -y
   ```

### Step 2: Application Setup

1. **Create application directory:**

   ```bash
   sudo mkdir -p /var/www/lobe-chat
   sudo chown $USER:$USER /var/www/lobe-chat
   ```

2. **Clone the repository:**

   ```bash
   cd /var/www/lobe-chat
   git clone https://github.com/lobehub/lobe-chat.git .
   ```

3. **Install dependencies:**

   ```bash
   pnpm install --frozen-lockfile
   ```

4. **Build the application:**
   ```bash
   pnpm run build
   ```

### Step 3: Environment Configuration

1. **Create environment file:**

   ```bash
   cp env.example .env.local
   ```

2. **Edit the environment file:**

   ```bash
   nano .env.local
   ```

3. **Configure the following variables:**

   ```env
   # Required
   APP_URL=https://your-domain.com
   
   # Optional but recommended
   ACCESS_CODE=your-secure-access-code
   DATABASE_URL=postgresql://username:password@localhost:5432/lobe_chat
   ```

### Step 4: PM2 Configuration

1. **Copy the ecosystem file:**

   ```bash
   sudo cp ecosystem.config.js /etc/pm2/ecosystem.config.js
   ```

2. **Start the application:**

   ```bash
   pm2 start /etc/pm2/ecosystem.config.js
   ```

3. **Save PM2 configuration:**

   ```bash
   pm2 save
   ```

4. **Setup PM2 to start on boot:**
   ```bash
   pm2 startup
   # Follow the instructions provided by the command
   ```

### Step 5: Nginx Configuration

1. **Copy the Nginx configuration:**

   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/lobe-chat
   ```

2. **Update the domain name in the config:**

   ```bash
   sudo nano /etc/nginx/sites-available/lobe-chat
   # Replace 'your-domain.com' with your actual domain
   ```

3. **Enable the site:**

   ```bash
   sudo ln -s /etc/nginx/sites-available/lobe-chat /etc/nginx/sites-enabled/
   ```

4. **Remove default site (optional):**

   ```bash
   sudo rm /etc/nginx/sites-enabled/default
   ```

5. **Test and restart Nginx:**
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   sudo systemctl enable nginx
   ```

### Step 6: SSL Setup (Optional but Recommended)

1. **Install Certbot:**

   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Obtain SSL certificate:**

   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

3. **Setup auto-renewal:**
   ```bash
   sudo crontab -e
   # Add this line:
   # 0 12 * * * /usr/bin/certbot renew --quiet
   ```

## 🔧 Configuration Files

### PM2 Ecosystem (`ecosystem.config.js`)

- Manages the Node.js application process
- Handles automatic restarts and logging
- Configures environment variables

### Nginx Configuration (`nginx.conf`)

- Reverse proxy to the Node.js application
- SSL termination
- Static file serving and caching
- Security headers

### Environment Variables (`env.example`)

- Application configuration
- Database connection
- Authentication settings
- Optional integrations

## 📊 Monitoring and Maintenance

### Check Application Status

```bash
# PM2 status
pm2 status

# PM2 logs
pm2 logs lobe-chat

# Nginx status
sudo systemctl status nginx

# Application health
curl http://localhost:3210/health
```

### Update Application

```bash
cd /var/www/lobe-chat
git pull origin main
pnpm install --frozen-lockfile
pnpm run build
pm2 restart lobe-chat
```

### Backup

```bash
# Backup application files
tar -czf lobe-chat-backup-$(date +%Y%m%d).tar.gz /var/www/lobe-chat

# Backup PM2 configuration
pm2 save
```

## 🚨 Troubleshooting

### Common Issues

1. **Application won't start:**
   - Check PM2 logs: `pm2 logs lobe-chat`
   - Verify environment variables
   - Check if port 3210 is available

2. **Nginx 502 Bad Gateway:**
   - Verify the application is running: `pm2 status`
   - Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
   - Ensure the application is listening on the correct port

3. **SSL certificate issues:**
   - Check certificate status: `sudo certbot certificates`
   - Renew certificate: `sudo certbot renew`
   - Verify domain DNS settings

4. **Permission issues:**
   - Check file ownership: `ls -la /var/www/lobe-chat`
   - Fix permissions: `sudo chown -R $USER:$USER /var/www/lobe-chat`

### Log Locations

- PM2 logs: `~/.pm2/logs/`
- Nginx logs: `/var/log/nginx/`
- Application logs: `/var/log/pm2/`

## 🔒 Security Considerations

1. **Firewall Configuration:**

   ```bash
   sudo ufw allow 22  # SSH
   sudo ufw allow 80  # HTTP
   sudo ufw allow 443 # HTTPS
   sudo ufw enable
   ```

2. **Regular Updates:**
   - Keep the system updated
   - Update Node.js and dependencies regularly
   - Monitor security advisories

3. **Access Control:**
   - Use strong access codes
   - Enable authentication if needed
   - Restrict database access

## 📈 Performance Optimization

1. **Enable Gzip compression** (already configured in Nginx)

2. **Configure caching** (already configured for static files)

3. **Monitor resource usage:**

   ```bash
   pm2 monit
   htop
   ```

4. **Database optimization:**
   - Use connection pooling
   - Optimize queries
   - Regular maintenance

## 🆘 Support

If you encounter issues:

1. Check the logs first
2. Verify all configuration files
3. Ensure all services are running
4. Check the official LobeChat documentation
5. Create an issue on the GitHub repository

## 📚 Additional Resources

- [LobeChat Documentation](https://lobehub.com/docs)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

**Note:** This deployment guide assumes you have basic knowledge of Linux server administration. If you're new to server management, consider using a managed hosting service or consulting with a system administrator.
