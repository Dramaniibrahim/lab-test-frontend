// ================== AUTH ==================
export const LOGIN_URL = "/auth/login";
export const REGISTER_URL = "/auth/register";
export const REFRESH_TOKEN_URL = "/auth/refresh";
export const LOGOUT_URL = "/auth/logout";
export const LOGOUT_ALL_URL = "/auth/logout-all";
export const PROFILE_URL = "/auth/profile";
export const CHANGE_PASSWORD_URL = "/auth/change-password";
export const VERIFY_TOKEN_URL = "/auth/verify";

// ================== PATIENTS ==================
export const PATIENTS_URL = "/patients";
export const PATIENT_BY_ID_URL = (id) => `/patients/${id}`;
export const PATIENT_TEST_REQUESTS_URL = (id) => `/patients/${id}/test-requests`;
export const PATIENT_STATS_URL = "/patients/stats";

// ================== TEST REQUESTS ==================
export const TEST_REQUESTS_URL = "/test-requests";
export const TEST_REQUEST_BY_ID_URL = (id) => `/test-requests/${id}`;
export const TEST_REQUEST_SUMMARY_URL = "/test-requests/stats/summary";

// ================== SAMPLES ==================
export const SAMPLES_URL = "/samples";
export const SAMPLE_BY_ID_URL = (id) => `/samples/${id}`;
export const SAMPLE_BY_BARCODE_URL = (barcode) => `/samples/barcode/${barcode}`;
export const SAMPLE_SUMMARY_URL = "/samples/stats/summary";

// ================== LAB RESULTS ==================
export const LAB_RESULTS_URL = "/lab-results";
export const LAB_RESULT_BY_ID_URL = (id) => `/lab-results/${id}`;
export const VALIDATE_RESULT_URL = (id) => `/lab-results/${id}/validate`;
export const RELEASE_RESULT_URL = (id) => `/lab-results/${id}/release`;
export const LAB_RESULT_SUMMARY_URL = "/lab-results/stats/summary";

// ================== SYSTEM ==================
export const HEALTH_URL = "/health";
