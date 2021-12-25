import "reflect-metadata";

namespace InversionOfControlContainer {
  interface Type<T> {
    new (...args: any[]): T;
  }

  abstract class Container {
    public static designParamTypes = "design:paramtypes";
    public static designType = "design:type";

    private static bean = new Map<string, any>();

    static get<T>(target: Type<T>): T {
      if (this.bean.has(target.name)) {
        return this.bean.get(target.name);
      }

      const tokens: Type<any>[] =
        Reflect.getMetadata(this.designParamTypes, target) || [];

      const injections = tokens.map((token) => {
        return Container.get(token);
      });

      const instance = new target(...injections);
      this.bean.set(target.name, instance);

      return instance;
    }
  }

  function Injectable() {
    return function <T>(target: Type<T>) {
      Reflect.getMetadata(Container.designParamTypes, target);
    };
  }

  @Injectable()
  class UserRepository {
    findById(id: number) {
      return { user: "user", id };
    }
  }

  @Injectable()
  class PostRepository {
    getUserPosts(userId: number) {
      return [
        { title: "post1", userId },
        { title: "post2", userId },
      ];
    }
  }

  @Injectable()
  class BlogService {
    constructor(
      private readonly userRepository: UserRepository,
      private readonly postRepository: PostRepository
    ) {}

    getBlogInfo(id: number) {
      const user = this.userRepository.findById(id);
      const posts = this.postRepository.getUserPosts(id);

      return { user, posts };
    }
  }

  const blogService = Container.get(BlogService);

  blogService.getBlogInfo(1);
}

/**
 * Inversion of Control Container or Dependency Inversion
 *
 * Higher modules of our application should not be aware about lower modules and implementation details.
 * It makes the code low coupled and manageable. The IoC and DI is the techniques to achieve the desired
 * decoupling.
 *
 * High feature module imagines that he has some higher level methods for his needs. The class uses it
 * without knowing much about the implementation.
 *
 */
