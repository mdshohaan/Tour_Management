import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const user = await UserServices.createUser(req.body);

    // // res.status(httpStatus.CREATED).json({
    // //   message: "User Created Successfully",
    // //   user,
    // // });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Login Successfully",
      data: user,
    });
  }
);
export const AuthControllers = {
  credentialLogin,
};
