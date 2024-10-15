export function ComponentTest(){

    return (
        <div style={{
            padding: "50px"
        }}>
            <h1> Component Test</h1>

            <Modal>
                <div>
                    <p>Children</p>
                </div>
            </Modal>
        </div>
    )
}

function Modal({children}){

    return (
        <div></div>
    )
}