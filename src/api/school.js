import axios from 'axios';
import { req,reqget } from './axiosFun';

/**
 * 学校列表信息
 **/
// 学校列表信息

export const OrderRefund1 = (params) => { return req("post", "/api/login.php", params) };
export const datacheck = (params) => { return reqget("get", "/api/test.php" , params) };
export const dataUpdate = (params) => { return req("post", "/api/updateSchool.php" , params) };
export const dataAdd = (params) => { return req("post", "/api/addSchool1.php" , params) };
export const dataDelete = (params) => { return req("post", "/api/dataDelete.php" , params) };