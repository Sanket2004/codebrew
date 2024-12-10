"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Editor } from "@monaco-editor/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function EditorPage() {
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(true); // Loading state for languages
  const [input, setInput] = useState("");

  useEffect(() => {
    // Fetch languages and set initial state
    const fetchLanguages = async () => {
      try {
        setIsLoadingLanguages(true); // Set loading to true when fetching languages
        const response = await fetch("/api/compile");
        const data = await response.json();

        const uniqueLanguages = Array.from(
          new Map(data.map((lang) => [lang.id, lang])).values()
        );

        setLanguages(uniqueLanguages);

        if (uniqueLanguages.length > 0) {
          uniqueLanguages.sort((a, b) => a.name.localeCompare(b.name));
          // Set the default language and code (only if we have languages)
          setLanguage(uniqueLanguages[0]);
          setCode(uniqueLanguages[0].boilerplate || "");
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
      } finally {
        setIsLoadingLanguages(false); // Set loading to false once the fetch is done
      }
    };

    fetchLanguages();
  }, []);

  const handleLanguageChange = (value) => {
    const selectedLanguage = languages.find((lang) => lang.id === value);
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      setCode(selectedLanguage.boilerplate || "");
    }
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: language.id,
          code,
          input,
          version: language.version,
        }),
      });

      const data = await response.json();
      setOutput(data.output || "No output or an error occurred.");
    } catch (error) {
      console.error("Error running code:", error);
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-medium text-sm">Code Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Show a loader while fetching languages */}
            <Select
              onValueChange={handleLanguageChange}
              value={language?.id || ""}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingLanguages ? (
                  <SelectItem disabled>Loading...</SelectItem> // Disable select when loading
                ) : (
                  languages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id}>
                      {lang.name} ({lang.version})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Editor
              height={"350px"}
              className="border rounded-lg shadow-sm overflow-hidden"
              onChange={(e) => setCode(e)}
              value={code}
              language={language?.id || "plaintext"}
              options={{
                readOnly: !language, // Make the editor read-only if no language is selected
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleRunCode}
            disabled={isLoading || isLoadingLanguages}
          >
            {isLoading ? "Running..." : "Run Code"}
          </Button>
        </CardFooter>
      </Card>
      <div className="h-full grid grid-rows-2 gap-4">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="font-medium text-sm">Standard Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              rows={7}
              className="resize-none"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-medium text-sm">Standard Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap overflow-auto max-h-40 rounded-lg border p-2 min-h-[9.8rem]">
              {output}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
