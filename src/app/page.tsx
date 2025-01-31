"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/redux/store";
import { getAboutSelector } from "@/redux/reducers/about/selectors";
import { fetchAboutRequest } from "@/redux/reducers/about/actions";
import { LoginBoard } from "@/component/LoginBoard";
import { parseCookies} from "nookies";



export default function Home() {
  const { accessToken } = parseCookies();
  const data = 'christy'
  const dispatch = useDispatch<AppDispatch>();
  const categoryStore: any = useSelector(getAboutSelector);
  useEffect(()=> {
    dispatch(fetchAboutRequest(data));
  },[])

  return (
    <main>
      {!accessToken && <LoginBoard/>}
    </main>
  );
}
