import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { api } from '../apis';

export const CONGRATULATION_QUERY_KEY = 'congratulation';
export const EVENT_QUERY_KEY = 'event';
export const FIREBASE_QUERY_KEY = 'firebase';

export interface ICongratulationData {
  id: number;
  name: string;
  contents: string;
  createdAt: string;
}

export interface ICongratulationParams {
  lastId?: number | null;
  limit: number;
  sortType: 'NEW' | 'OLD';
}

export interface ICongratulationCreate {
  name: string;
  contents: string;
  password: string;
}

export interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface IFirebaseConfigCount {
  apiKey: string;
}

// 축하글 등록
export const usePostCongratulationMutation = () => {
  return useMutation((requestBody: ICongratulationCreate) => api.post(`/v1/congratulation`, requestBody));
};

// 축하글 삭제
export const useDeleteCongratulationMutation = () => {
  return useMutation(({ id, password }: { id: number; password: string }) =>
    api.post(`/v1/congratulation/${id}/del`, password)
  );
};

// 축하글 연속조회
export const useGetCongratulationsInfinityQuery = (params: Omit<ICongratulationParams, 'lastId'> | null) => {
  return useInfiniteQuery(
    [CONGRATULATION_QUERY_KEY, params],
    ({ pageParam: lastId }) => {
      return api
        .get<ICongratulationData[]>(`/v1/congratulation/no-offset`, {
          params: {
            ...params,
            lastId,
          },
        })
        .then(({ data: responseData }) => responseData);
    },
    {
      enabled: !!params,
      getNextPageParam: (lastPage) => {
        return lastPage[lastPage.length - 1]?.id;
      },
    }
  );
};
