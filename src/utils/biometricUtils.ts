import { Alert } from 'react-native';

import ReactNativeBiometrics from 'react-native-biometrics';

let rnBiometrics: any = null;

try {
  rnBiometrics = new ReactNativeBiometrics();
  console.log('✅ Library Biometrik Original siap.');
} catch (e) {
  console.warn('⚠️ Gagal load Biometrik:', e);
}

export interface BiometricStatus {
  available: boolean;
  type: 'FaceID' | 'TouchID' | 'Biometrics' | undefined;
  error?: string;
}

export const checkBiometricAvailability = async (): Promise<BiometricStatus> => {
  if (!rnBiometrics) return { available: false, type: undefined, error: 'LibMissing' };

  try {
    const result = await rnBiometrics.isSensorAvailable();
    const { available, biometryType, error } = result;

    if (available && biometryType) {
      return { available: true, type: biometryType };
    } else {
      if (error === 'Biometric not enrolled') { 
        return { available: false, type: undefined, error: 'NotEnrolled' };
      }
      return { available: false, type: undefined, error: error || 'NotAvailable' };
    }
  } catch (e) {
    return { available: false, type: undefined, error: 'Unknown' };
  }
};

export const promptBiometricAuth = async (message: string, cancelText: string = 'Batal') => {
  if (!rnBiometrics) return { success: false, error: 'LibMissing' };

  try {
    const result = await rnBiometrics.simplePrompt({
      promptMessage: message,
      cancelButtonText: cancelText,
    });
    
    const { success, error } = result;
    return { success, error };
  } catch (e) {
    return { success: false, error: 'SystemError' };
  }
};