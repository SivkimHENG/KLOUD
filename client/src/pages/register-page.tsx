


export default function RegisterPage() {






    async function PostAPI() {
        try {
            const response =  await fetch ("");
            const data =  await response.json();

            return response;
            

        } catch(error) {
            console.log(error);
        }

    }



    return (
        <>
            <form onSubmit={PostAPI} method="POST">



            </form>

        </>




    )




}
