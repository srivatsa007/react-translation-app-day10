import { useEffect, useState } from "react";
import axios from "axios";
import LangComp from "./LangComp";

async function FetchAns(inputLang, outputLang, inputText, setOutputText) {
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", inputLang);
  encodedParams.set("target_language", outputLang);
  encodedParams.set("text", inputText);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "d716907b18msh9e8b14e0a00b6fcp1c641bjsne19d0537b55b",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    setOutputText(response.data.data.translatedText);
    console.log(response.data.data.translatedText);
  } catch (error) {
    console.error(error);
  }
}

function Languages() {
  const [Languages, setLanguages] = useState([]);
  const [InputLang, setInputLang] = useState("en");
  const [OutputLang, setOutputLang] = useState("en");
  const [InputText, setInputText] = useState("");
  const [OutputText, setOutputText] = useState("");

  useEffect(() => {
    async function FetchData() {
      try {
        const response = await fetch("https://libretranslate.com/languages");
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.log(error);
      }
    }
    FetchData();
  }, []);

  const handleInputChange = (e) => {
    setInputLang(e.target.value);
    handleOutputChange(e);
  };

  const handleOutputChange = (e) => {
    setOutputLang(e.target.value);
    console.log(OutputLang);
  };

  const handleInputText = (e) => {
    setInputText(e.target.value);
    setOutputText(""); // Reset OutputText when input text changes
  };

  const handleOutputText = (e) => {
    setOutputText(e.target.value);
  };

  useEffect(() => {
    console.log(1);
  }, [OutputLang]);

  useEffect(() => {
    console.log("Input Language:", InputLang);
  }, [InputLang]);

  useEffect(() => {
    console.log("Input Text:", InputText);
  }, [InputText]);

  useEffect(() => {
    console.log("Output Text:", OutputText);
  }, [OutputText]);

  return (
    <div className="flex bg-gradient-to-r from-slate-500 to-slate-800 h-screen items-center flex-col gap-16 pt-32">
      <h2 className="text-4xl font-bold text-white">Please select Languages for translation...</h2>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <select
            name="inputLang"
            id="inputLanguage"
            onChange={handleInputChange}
            className="text-2xl font-semibold borderrounded-md"
          >
            {Languages.map((language) => (
              <LangComp
                key={language.code}
                code={language.code}
                name={language.name}
              />
            ))}
          </select>
          <textarea
            rows="5"
            cols="40"
            placeholder="Input text"
            onChange={handleInputText}
            className="text2xl font-semibold bg-white p-4 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <select
            name="outputLang"
            id="outputLanguage"
            onChange={handleOutputChange}
            className="text-2xl font-semibold borderrounded-md"
          >
            {Languages.map((language) => (
              <LangComp
                key={language.code + language.name}
                code={language.code}
                name={language.name}
              />
            ))}
          </select>
          <textarea
            rows="5"
            cols="40"
            placeholder="Output text"
            value={OutputText}
            disabled
            className="text2xl font-semibold bg-white p-4 rounded-md"
          />
        </div>
      </div>
      <button
        onClick={() =>
          FetchAns(InputLang, OutputLang, InputText, setOutputText)
        }
        className=" text-white font-normal py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-white hover:bg-purple-700 hover:text-white"
      >
        Translate Text
      </button>
    </div>
  );
}

export default Languages;