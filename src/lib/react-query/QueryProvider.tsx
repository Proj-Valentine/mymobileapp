// create a new query client context

// import { ReactNode }  from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

// export const QueryProvider = ({ children }: { children: ReactNode}) => {
//   return (
//     <QueryClientProvider client ={queryClient}>
//         {children}
//     </QueryClientProvider>
//   )
// }

import React from "react";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};