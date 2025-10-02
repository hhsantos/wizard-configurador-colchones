import { createContext, useContext, useReducer } from 'react';
import { STEPS } from '../constants/steps';

// Re-export STEPS for backward compatibility
export { STEPS };

// Estado inicial
const initialState = {
  currentStep: STEPS.WELCOME,
  answers: {
    sleepSituation: null,
    sleepPosition: [],
    firmness: null,
    partnerFirmness: null,
    healthConcerns: [],
    materialPreference: null,
    budget: null
  },
  recommendations: [],
  isLoading: false,
  stepHistory: [STEPS.WELCOME]
};

// Acciones del reducer
const wizardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.key]: action.value
        }
      };
    
    case 'GO_TO_STEP': {
      const newHistory = [...state.stepHistory];
      if (!newHistory.includes(action.step)) {
        newHistory.push(action.step);
      }
      return {
        ...state,
        currentStep: action.step,
        stepHistory: newHistory
      };
    }
    
    case 'GO_BACK': {
      const currentIndex = state.stepHistory.indexOf(state.currentStep);
      const previousStep = currentIndex > 0 ? state.stepHistory[currentIndex - 1] : state.currentStep;
      return {
        ...state,
        currentStep: previousStep
      };
    }
    
    case 'SET_RECOMMENDATIONS':
      return {
        ...state,
        recommendations: action.recommendations,
        isLoading: false
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      };
    
    case 'RESET_WIZARD':
      return initialState;
    
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Contexto
const WizardContext = createContext();

// Provider
export const WizardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  // Acciones
  const setAnswer = (key, value) => {
    dispatch({ type: 'SET_ANSWER', key, value });
  };

  const goToStep = (step) => {
    dispatch({ type: 'GO_TO_STEP', step });
  };

  const goBack = () => {
    dispatch({ type: 'GO_BACK' });
  };

  const setRecommendations = (recommendations) => {
    dispatch({ type: 'SET_RECOMMENDATIONS', recommendations });
  };

  const setLoading = (isLoading) => {
    dispatch({ type: 'SET_LOADING', isLoading });
  };

  const resetWizard = () => {
    dispatch({ type: 'RESET_WIZARD' });
  };

  const value = {
    ...state,
    setAnswer,
    goToStep,
    goBack,
    setRecommendations,
    setLoading,
    resetWizard
  };

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
};

// Hook personalizado
export const useWizard = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};