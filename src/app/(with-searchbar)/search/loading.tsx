/**
 * [Streaming]
 * Dynamic Page는 기본적으로 페이지가 로딩이 될 때, loading.tsx 컴포넌트가 우선적으로 브라우저에 제공이 된다.
 * (ex. 페이지 이동, 새로고침 등)
 *
 * [주의사항]
 * 1. layout과 동일한 개념으로 하위 페이지에 스트리밍이 제공이 된다.
 *   - 그래서 만약 /search/setting 페이지가 있다면 해당 페이지로 이동할때 /search 경로에 있는 loading.tsx 우선 렌더링 된다.
 * 2. async 키워드가 붙은 비동기 컴포넌트만 스트리밍 기능이 제공이 된다.
 * 3. loading.tsx는 오직 page.tsx에만 스트리밍을 제공한다.
 * 4. 페이지의 컴포넌트가 로드 될 때만 스트리밍이 제공된다.
 *   - 때문에 파라미터가 수정되어 API를 재호출하는 경우에는 로딩페이지 표출이 되지 않는다
 *
 *
 * @결론
 * loading 컴포넌트만으로는 온전히 사용자 경험(UI/UX)를 개선하는데 한계가 있다. (주의사항 3, 4 참조)
 * 그래서 Next App은 Suspense라는 컴포넌트를 제공하여 개발자는 보다 더 세밀하게 스트리밍 기능을 활용 할 수 있다.
 */
export default function Loading() {
  return <div>Loading...</div>;
}
