import { AxiosResponse } from "axios";
import React from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { api } from "../apis";

export const CONGRATULATION_QUERY_KEY = "congratulation";

export interface ICongratulationData {
  id: number;
  name: string;
  contents: string;
  createdAt: string;
}
export interface ICongratulationParams {
  lastId?: number | null;
  limit: number;
  sortType: "NEW" | "OLD";
}

// 축하글 조회
export const useGetCongratulationsQuery = (
  params: ICongratulationParams | null,
) => {
  return useQuery(
    [CONGRATULATION_QUERY_KEY, params],
    () =>
      api
        .get<ICongratulationData[]>(`/v1/congratulation/no-offset`, { params })
        .then(({ data: responseData }) => responseData),
    {
      enabled: !!params,
    },
  );
};

export const useGetCongratulationsInfinityQuery = (
  params: Omit<ICongratulationParams, "lastId"> | null,
) => {
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
    },
  );
};
