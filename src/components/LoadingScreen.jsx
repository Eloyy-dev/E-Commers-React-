import '../style/loadingScreen.css'
const LoadingScreen = () => {
  return (
    <>
      <div className='overlay'>
        <div className="lds-hourglass"></div>
      </div>
    </>
  );
}

export default LoadingScreen;