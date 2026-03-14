# Security Configuration Guide

## Environment Variables

This application uses environment variables to store sensitive configuration. **NEVER commit `.env` or `.env.local` files to version control.**

### Setup Instructions

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your local credentials:
   - Set a secure `APP_SECRET` (generate with: `php bin/console secrets:generate-keys`)
   - Configure `DATABASE_URL` with your database credentials
   - Set other environment-specific values

3. For production, use environment variables or Symfony secrets:
   ```bash
   php bin/console secrets:set APP_SECRET
   php bin/console secrets:set DATABASE_URL
   ```

## Security Features Enabled

### CSRF Protection
- Enabled in `config/packages/framework.yaml`
- All forms automatically include CSRF tokens
- Delete operations verify CSRF tokens

### Session Security
- `cookie_httponly: true` - Prevents JavaScript access to session cookies
- `cookie_secure: auto` - Uses HTTPS in production
- `cookie_samesite: lax` - Prevents CSRF attacks

### Recommended Additional Security Measures

1. **Install Security Headers Bundle** (for production):
   ```bash
   composer require nelmio/security-bundle
   ```

   Then configure in `config/packages/nelmio_security.yaml`:
   ```yaml
   nelmio_security:
       content_security_policy:
           default-src: ["'self'"]
           script-src: ["'self'", "'unsafe-inline'"]
           style-src: ["'self'", "'unsafe-inline'"]
       x_frame_options:
           value: DENY
       x_content_type_options:
           value: nosniff
       referrer_policy:
           value: 'strict-origin-when-cross-origin'
   ```

2. **Enable Access Control** in `config/packages/security.yaml`:
   - Configure authentication providers
   - Set up role-based access control
   - Protect sensitive routes

3. **Keep Dependencies Updated**:
   ```bash
   composer update
   composer audit
   ```

4. **Use HTTPS in Production**:
   - Configure your web server (Apache/Nginx) to enforce HTTPS
   - Set `SECURE_SCHEME=https` in production `.env`

## Security Checklist

- [x] `.env` files excluded from version control
- [x] CSRF protection enabled
- [x] Session cookies secured with httponly flag
- [x] Database credentials not hardcoded
- [ ] Access control configured (if needed)
- [ ] HTTPS enforced in production
- [ ] Security headers configured (recommended)
- [ ] Dependencies regularly updated
- [ ] Input validation in forms
