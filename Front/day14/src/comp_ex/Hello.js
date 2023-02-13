function Hello({ name, address, changeName }) {
    return (
        <h1>
            Hello {name} in {address}
            <br />
            <button
                onClick={function () {
                    changeName("철수");
                }}
            >
                이름 바꾸기
            </button>
        </h1>
    );
}
export default Hello;