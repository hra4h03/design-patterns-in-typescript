interface CreateUserDto {}
interface PasswordResetDto {}

class UserService {
  create(user: CreateUserDto) {}

  resetPassword(newPassword: string, password: string) {}

  findByMail(mail: string) {
    return {};
  }
}

class MailService {
  sendPasswordResetMail(mail: string, url: string) {}
}

class UrlService {
  validateTemporaryUrl(urlHash: string) {
    return true;
  }

  createTemporaryUrl() {
    return "random-string";
  }
}

class UserFacade {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly urlService: UrlService
  ) {}

  forgotPassword(mail: string) {
    const userExist = this.userService.findByMail(mail);

    if (!userExist) return "Not found";

    const hashedUrl = this.urlService.createTemporaryUrl();

    this.mailService.sendPasswordResetMail(mail, hashedUrl);
  }

  resetPassword(url: string, newPassword: string, password: string) {
    const isValid = this.urlService.validateTemporaryUrl(url);

    if (!isValid) return "Url expired";

    this.userService.resetPassword(newPassword, password);
  }
}

/**
 * Facade Pattern hides the underneath complexity and shows a simple interface for client to work.
 *
 * Facade Pattern Pros
 *  * Helps to decouple subsystems from each other.
 *
 * Facade Pattern Cons
 *  * Facade class may become coupled with lots of subclasses.
 *
 */
