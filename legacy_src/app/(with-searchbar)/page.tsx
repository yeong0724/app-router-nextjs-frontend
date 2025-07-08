/**
 * - 컴포넌트는 default로 React-Server-Component로 생성이 된다.
 *   때문에 일반적인 컴포넌트에서 useEffect를 사용하게 되면 에러가 발생한다. 왜냐하면 Hook 브라우저에서만 사용한 가능하기 때문이다.
 *   실제로 console.log를 찍어봐도 브라우저에서는 전혀 로그가 찍히지 않는다.
 * - "use client"로 컴포넌트 상단에 표기해주면 이제부터 해당 컴포넌트는 Client-Component로 인식되어 일반적으로 우리가 아는 컴포넌트로 동작하게 된다.
 */
import styles from "@/app/(with-searchbar)/page.module.css";
import ClientComponent from "../../components/client-component";
import ServerComponent from "../../components/server-component";

/**
 * [React Server Component 주의사항]
 * 1. Server Component에는 브라우저에서 실행될 코드가 포함되어서는 안된다.
 * 2. Client Component는 클라이언트에서만 실행되는게 아니다.
 * 3. Client Component에서 Server Component를 import 해서는 안된다.
 * 4. Server Component에서 Client Component에게 직렬화 되지 않는 Props(ex. Function ...)는 전달이 불가하다.
 */
export default function Home() {
  return (
    <div className={styles.page}>
      인덱스 페이지
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
