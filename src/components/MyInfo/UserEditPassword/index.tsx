import { useRouter } from "next/router";

const UserEditPassword = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div>
        <div>비밀번호 변경 페이지</div>
      </div>
    </>
  );
};
export default UserEditPassword;
