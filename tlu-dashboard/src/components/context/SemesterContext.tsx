import React, { createContext, useContext, useState, useEffect } from 'react';
import { SemesterApi } from '../../repository/SemesterApi';
import type { Semester } from '../../types';
import { useAuth } from './AuthContext';

interface SemesterContextType {
  semesters: Semester[];
  selectedSemesterId: string | null;
  setSelectedSemesterId: (id: string | null) => void;
  loading: boolean;
}

const SemesterContext = createContext<SemesterContextType | undefined>(undefined);

export const SemesterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [selectedSemesterId, setSelectedSemesterId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchSemesters = async () => {
      setLoading(true);
      try {
        const data = await SemesterApi.getAll();
        setSemesters(data);
        if (data.length > 0) {
          setSelectedSemesterId(data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch semesters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSemesters();
  }, [isAuthenticated]);

  return (
    <SemesterContext.Provider value={{ semesters, selectedSemesterId, setSelectedSemesterId, loading }}>
      {children}
    </SemesterContext.Provider>
  );
};

export const useSemester = () => {
  const context = useContext(SemesterContext);
  if (context === undefined) {
    throw new Error('useSemester must be used within a SemesterProvider');
  }
  return context;
};
