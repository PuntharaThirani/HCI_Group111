// ==================== Date & Time Helpers ====================

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type (short, long, full)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'medium') => {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  
  const options = {
    short: { month: 'numeric', day: 'numeric', year: '2-digit' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
  };
  
  return dateObj.toLocaleDateString('en-US', options[format] || options.medium);
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };
  
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }
  
  return 'just now';
};

/**
 * Calculate days remaining until deadline
 * @param {string|Date} deadline - Deadline date
 * @returns {number} Days remaining (negative if overdue)
 */
export const getDaysRemaining = (deadline) => {
  if (!deadline) return 0;
  
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * Check if deadline is overdue
 * @param {string|Date} deadline - Deadline date
 * @returns {boolean} True if overdue
 */
export const isOverdue = (deadline) => {
  return getDaysRemaining(deadline) < 0;
};

// ==================== Number & Currency Helpers ====================

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (USD, EUR, GBP)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === undefined || amount === null) return 'N/A';
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return formatter.format(amount);
};

/**
 * Format percentage
 * @param {number} value - Value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 0) => {
  if (value === undefined || value === null) return 'N/A';
  
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (num === undefined || num === null) return 'N/A';
  
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Calculate percentage
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} Percentage
 */
export const calculatePercentage = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100);
};

// ==================== Status & Color Helpers ====================

/**
 * Get status badge configuration
 * @param {string} status - Status string
 * @returns {object} Status config with color, background, icon
 */
export const getStatusConfig = (status) => {
  const statuses = {
    completed: {
      color: '#2e7d32',
      background: '#e8f5e9',
      icon: '✅',
      label: 'Completed'
    },
    'in-progress': {
      color: '#ef6c00',
      background: '#fff3e0',
      icon: '🔄',
      label: 'In Progress'
    },
    pending: {
      color: '#c62828',
      background: '#ffebee',
      icon: '⏳',
      label: 'Pending'
    },
    active: {
      color: '#2e7d32',
      background: '#e8f5e9',
      icon: '✅',
      label: 'Active'
    },
    inactive: {
      color: '#666',
      background: '#f5f5f5',
      icon: '⭕',
      label: 'Inactive'
    },
    low: {
      color: '#ff9800',
      background: '#fff3e0',
      icon: '⚠️',
      label: 'Low Stock'
    },
    'out-of-stock': {
      color: '#c62828',
      background: '#ffebee',
      icon: '❌',
      label: 'Out of Stock'
    },
    default: {
      color: '#666',
      background: '#f5f5f5',
      icon: '📌',
      label: status || 'Unknown'
    }
  };
  
  return statuses[status?.toLowerCase()] || statuses.default;
};

/**
 * Get priority badge configuration
 * @param {string} priority - Priority level
 * @returns {object} Priority config
 */
export const getPriorityConfig = (priority) => {
  const priorities = {
    high: {
      color: '#c62828',
      background: '#ffebee',
      icon: '🔴',
      label: 'High Priority'
    },
    medium: {
      color: '#ef6c00',
      background: '#fff3e0',
      icon: '🟡',
      label: 'Medium Priority'
    },
    low: {
      color: '#2e7d32',
      background: '#e8f5e9',
      icon: '🟢',
      label: 'Low Priority'
    },
    default: {
      color: '#666',
      background: '#f5f5f5',
      icon: '⚪',
      label: priority || 'Normal'
    }
  };
  
  return priorities[priority?.toLowerCase()] || priorities.default;
};

// ==================== Data Filtering & Sorting Helpers ====================

/**
 * Filter projects by search term
 * @param {array} projects - Projects array
 * @param {string} searchTerm - Search term
 * @returns {array} Filtered projects
 */
export const filterProjects = (projects, searchTerm) => {
  if (!searchTerm || !projects) return projects;
  
  const term = searchTerm.toLowerCase();
  
  return projects.filter(project => 
    project.name?.toLowerCase().includes(term) ||
    project.customer?.toLowerCase().includes(term) ||
    project.customerEmail?.toLowerCase().includes(term) ||
    project.id?.toString().includes(term)
  );
};

/**
 * Sort projects by field
 * @param {array} projects - Projects array
 * @param {string} sortBy - Sort field
 * @param {string} order - Sort order (asc, desc)
 * @returns {array} Sorted projects
 */
export const sortProjects = (projects, sortBy = 'date', order = 'desc') => {
  if (!projects) return [];
  
  const sorted = [...projects].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case 'name':
        valueA = a.name || '';
        valueB = b.name || '';
        return order === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
        
      case 'date':
        valueA = new Date(a.date || 0);
        valueB = new Date(b.date || 0);
        break;
        
      case 'progress':
        valueA = a.progress || 0;
        valueB = b.progress || 0;
        break;
        
      case 'budget':
        valueA = a.budget || 0;
        valueB = b.budget || 0;
        break;
        
      case 'deadline':
        valueA = new Date(a.deadline || 0);
        valueB = new Date(b.deadline || 0);
        break;
        
      default:
        return 0;
    }
    
    if (order === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });
  
  return sorted;
};

/**
 * Group projects by status
 * @param {array} projects - Projects array
 * @returns {object} Grouped projects
 */
export const groupProjectsByStatus = (projects) => {
  if (!projects) return {};
  
  return projects.reduce((groups, project) => {
    const status = project.status || 'unknown';
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(project);
    return groups;
  }, {});
};

/**
 * Calculate project statistics
 * @param {array} projects - Projects array
 * @returns {object} Project statistics
 */
export const calculateProjectStats = (projects) => {
  if (!projects || projects.length === 0) {
    return {
      total: 0,
      completed: 0,
      inProgress: 0,
      pending: 0,
      completionRate: 0,
      totalBudget: 0,
      totalSpent: 0,
      averageProgress: 0
    };
  }
  
  const stats = {
    total: projects.length,
    completed: projects.filter(p => p.status === 'completed').length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    pending: projects.filter(p => p.status === 'pending').length,
    totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
    totalSpent: projects.reduce((sum, p) => sum + (p.spent || 0), 0),
  };
  
  stats.completionRate = calculatePercentage(stats.completed, stats.total);
  stats.averageProgress = Math.round(
    projects.reduce((sum, p) => sum + (p.progress || 0), 0) / stats.total
  );
  
  return stats;
};

// ==================== Validation Helpers ====================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number
 * @param {string} phone - Phone to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
  // simplified regex - plus and period don't need escaping
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result
 */
export const validatePassword = (password) => {
  const result = {
    isValid: false,
    strength: 0,
    errors: []
  };
  
  if (!password) {
    result.errors.push('Password is required');
    return result;
  }
  
  // Check length
  if (password.length < 8) {
    result.errors.push('Password must be at least 8 characters');
  } else {
    result.strength += 25;
  }
  
  // Check for uppercase
  if (/[A-Z]/.test(password)) {
    result.strength += 25;
  } else {
    result.errors.push('Include at least one uppercase letter');
  }
  
  // Check for lowercase
  if (/[a-z]/.test(password)) {
    result.strength += 25;
  } else {
    result.errors.push('Include at least one lowercase letter');
  }
  
  // Check for numbers
  if (/[0-9]/.test(password)) {
    result.strength += 15;
  } else {
    result.errors.push('Include at least one number');
  }
  
  // Check for special characters
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    result.strength += 10;
  } else {
    result.errors.push('Include at least one special character');
  }
  
  result.isValid = result.errors.length === 0;
  
  return result;
};

// ==================== Local Storage Helpers ====================

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to save
 */
export const saveToStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Load data from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} Loaded data
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return defaultValue;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 * @param {string} key - Storage key
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Clear all localStorage data
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// ==================== File Helpers ====================

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get file extension
 * @param {string} filename - File name
 * @returns {string} File extension
 */
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

/**
 * Check if file is image
 * @param {string} filename - File name
 * @returns {boolean} True if image
 */
export const isImageFile = (filename) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
  const ext = getFileExtension(filename).toLowerCase();
  return imageExtensions.includes(ext);
};

// ==================== Color Helpers ====================

/**
 * Get contrast color (black or white) based on background
 * @param {string} hexColor - Hex color code
 * @returns {string} Black or white
 */
export const getContrastColor = (hexColor) => {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

/**
 * Lighten or darken a color
 * @param {string} hexColor - Hex color code
 * @param {number} percent - Percentage to lighten (positive) or darken (negative)
 * @returns {string} Modified color
 */
export const adjustColor = (hexColor, percent) => {
  let R = parseInt(hexColor.substring(1, 3), 16);
  let G = parseInt(hexColor.substring(3, 5), 16);
  let B = parseInt(hexColor.substring(5, 7), 16);

  R = Math.min(255, Math.max(0, R + R * percent / 100));
  G = Math.min(255, Math.max(0, G + G * percent / 100));
  B = Math.min(255, Math.max(0, B + B * percent / 100));

  return `#${((1 << 24) + (Math.round(R) << 16) + (Math.round(G) << 8) + Math.round(B)).toString(16).slice(1)}`;
};

// ==================== Export Helpers ====================

/**
 * Export data as CSV
 * @param {array} data - Data to export
 * @param {string} filename - File name
 */
export const exportToCSV = (data, filename = 'export') => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
};

/**
 * Export data as JSON
 * @param {any} data - Data to export
 * @param {string} filename - File name
 */
export const exportToJSON = (data, filename = 'export') => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  window.URL.revokeObjectURL(url);
};

// ==================== Chart Helpers ====================

/**
 * Generate chart colors
 * @param {number} count - Number of colors needed
 * @returns {array} Array of colors
 */
export const generateChartColors = (count) => {
  const baseColors = [
    '#4a90e2', '#ff5252', '#4caf50', '#ff9800', '#9c27b0',
    '#00bcd4', '#e91e63', '#8bc34a', '#ffc107', '#795548'
  ];
  
  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }
  
  // Generate more colors if needed
  const colors = [...baseColors];
  for (let i = baseColors.length; i < count; i++) {
    const hue = (i * 137) % 360; // Use golden angle
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  
  return colors;
};

/**
 * Prepare data for pie chart
 * @param {array} data - Raw data
 * @param {string} labelKey - Key for labels
 * @param {string} valueKey - Key for values
 * @returns {object} Chart data
 */
export const preparePieChartData = (data, labelKey, valueKey) => {
  if (!data) return { labels: [], values: [], colors: [] };
  
  const labels = data.map(item => item[labelKey]);
  const values = data.map(item => item[valueKey]);
  const colors = generateChartColors(data.length);
  
  return { labels, values, colors };
};

// ==================== Pagination Helpers ====================

/**
 * Paginate array
 * @param {array} data - Array to paginate
 * @param {number} page - Current page
 * @param {number} itemsPerPage - Items per page
 * @returns {object} Paginated data
 */
export const paginate = (data, page = 1, itemsPerPage = 10) => {
  if (!data) return { items: [], totalPages: 0, currentPage: 1 };
  
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  return {
    items: paginatedItems,
    totalPages,
    currentPage: page,
    totalItems: data.length,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
};

// ==================== Notification Helpers ====================

/**
 * Show notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, warning, info)
 */
export const showNotification = (message, type = 'info') => {
  // This would integrate with your notification system
  console.log(`[${type.toUpperCase()}] ${message}`);
  
  // You can dispatch an event or use a global state
  const event = new CustomEvent('showNotification', {
    detail: { message, type }
  });
  window.dispatchEvent(event);
};

// ==================== Debounce Helper ====================

/**
 * Debounce function
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// ==================== Throttle Helper ====================

/**
 * Throttle function
 * @param {function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {function} Throttled function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Export all helpers as default object
export default {
  // Date & Time
  formatDate,
  getRelativeTime,
  getDaysRemaining,
  isOverdue,
  
  // Number & Currency
  formatCurrency,
  formatPercentage,
  formatNumber,
  calculatePercentage,
  
  // Status & Color
  getStatusConfig,
  getPriorityConfig,
  
  // Data Filtering
  filterProjects,
  sortProjects,
  groupProjectsByStatus,
  calculateProjectStats,
  
  // Validation
  isValidEmail,
  isValidPhone,
  isValidUrl,
  validatePassword,
  
  // Storage
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
  clearStorage,
  
  // File
  formatFileSize,
  getFileExtension,
  isImageFile,
  
  // Color
  getContrastColor,
  adjustColor,
  
  // Export
  exportToCSV,
  exportToJSON,
  
  // Chart
  generateChartColors,
  preparePieChartData,
  
  // Pagination
  paginate,
  
  // Notification
  showNotification,
  
  // Performance
  debounce,
  throttle
};