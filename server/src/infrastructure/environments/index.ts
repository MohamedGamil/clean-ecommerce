export function setEnvironment() {
    switch (process.env.NODE_ENV) {
      case 'test':
        return ['.env.test', '.env'];
      case 'staging':
        return ['.env.staging', '.env'];
      case 'production':
        return ['.env.production', '.env'];
      case 'development':
        return ['.env.development', '.env'];
      case 'production':
      default:
        return '.env';
    }
  }
