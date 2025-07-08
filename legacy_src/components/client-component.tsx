"use client";

import { Props } from "../types";

/**
 * - Client Component에 Server Component를 직접 import 하게 되면 Server Component는
 *   Nextjs App이 자동으로 Client Component로 변화를 해준다.
 * - 이는 JS 번들 사이즈가 결국 커지게 되는 결과를 초래하므로 바람직한 개발 방향은 아니다.
 *   대신 children 으로 Props를 전달해 사용하게 된다면 서버 클라이언트 그대로 사용이 가능하다.
 */
export default function ClientComponent({ children }: Props) {
  return <div>{children}</div>;
}
