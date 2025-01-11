// components/InitializationProvider.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { initializeApp } from "../store/slices/initializationSlice";
import Loader from "./Loader/Loader";

interface InitializationProviderProps {
  children: React.ReactNode;
}

const InitializationProvider: React.FC<InitializationProviderProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { isInitialized, error } = useAppSelector(
    (state) => state.initialization
  );

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!isInitialized ) {
    return <Loader />;
  }

//   if (error) {
//     return <div>Error initializing app: {error}</div>;
//   }

  return <>{children}</>;
};

export default InitializationProvider;
