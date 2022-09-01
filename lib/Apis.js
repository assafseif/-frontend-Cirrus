import { getToken } from "../lib/token";

//POST API
export const PostApi = async (payload, url) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};

//GET API
export const GetApi = async (url, jwt) => {
  let token = getToken() || jwt;
  const res = await fetch(url, {
    method: "Get",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

//DELETE API
export const DeleteApi = async (url, jwt) => {
  let token = getToken() || jwt;
  const res = await fetch(url, {
    method: "Delete",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

//PUT API
export const PutApi = async (payload, url) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};

//PATCH API
export const PatchApi = async (payload, url) => {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};
