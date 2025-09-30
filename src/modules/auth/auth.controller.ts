import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckOtpDto, SendOtpDto } from './dto/otp.dto';
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FormType } from '../../common/enum/form-type.enum';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/send-otp')
  @ApiOperation({ summary: 'Gets mobile number and sends OTP to user' })
  @ApiResponse({ status: 200, description: 'Returns Success message' })
  @ApiConsumes(FormType.Urlencoded, FormType.Json)
  sendOtp(@Body() otpDto: SendOtpDto) {
    return this.authService.sendOtp(otpDto);
  }
  @Post('/signin-up')
  @ApiOperation({ summary: 'Gets mobile number and OTP' })
  @ApiResponse({ status: 200, description: 'Returns Success message' })
  @ApiConsumes(FormType.Urlencoded, FormType.Json)
  signInSignUp(@Body() otpDto: CheckOtpDto) {
    return this.authService.signInSignUp(otpDto);
  }

  // No need for now
  // @Post('/check-otp')
  // @ApiConsumes(FormType.Urlencoded, FormType.Json)
  // checkOtp(@Body() otpDto: CheckOtpDto) {
  //   return this.authService.checkOtp(otpDto);
  // }
}
