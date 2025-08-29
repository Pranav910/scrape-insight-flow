// Chat data structures - converted from TypeScript interfaces
// These are now just JSDoc type definitions for reference

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} content
 * @property {'user' | 'assistant'} role
 * @property {ScrapedSource[]} [sources]
 * @property {string} timestamp
 */

/**
 * @typedef {Object} ScrapedSource
 * @property {string} id
 * @property {string} url
 * @property {string} title
 * @property {string} [favicon]
 * @property {'loading' | 'success' | 'error'} status
 * @property {string} timestamp
 */

/**
 * @typedef {Object} ChatSession
 * @property {string} id
 * @property {string} title
 * @property {Message[]} messages
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} ChatState
 * @property {ChatSession[]} sessions
 * @property {string | null} currentSession
 * @property {Object} preferences
 * @property {'dark'} preferences.theme
 * @property {boolean} preferences.sidebarCollapsed
 */

/**
 * @typedef {Object} MetricData
 * @property {string} id
 * @property {string} name
 * @property {number} value
 * @property {number} target
 * @property {number} change
 * @property {'good' | 'warning' | 'error'} status
 */

export {};