/**
 * [Parallel Route]
 * - @상위경로/하위경로 (ex. /parallel/setting)로 직접 url을 입력해서 페이지 이동을 하게 되면 이전 /parallel 경로에 대한
 *   페이지 정보들이 없기 때문에 404 Page 에러가 발생하게 된다. (오직 Link 태그를 이용한 클라이언트 사이드 방식으로 이동해야함)
 *
 * - 하지만 default 페이지를 생성해 놓으면 404 페이지 에러가 발생했을때 임시로 페이지를 띄워 에러를 방지 할 수 있다.
 */
export default function Page() {
  return <div>@feed/setting</div>;
}
