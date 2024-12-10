"use server";

import { NextResponse } from "next/server";

const PISTON_API_URL = process.env.PISTON_API_URL;

// List of major languages
const MAJOR_LANGUAGES = [
  "java",
  "python",
  "javascript",
  "typescript",
  "c",
  "c++",
  "go",
  "rust",
  "php",
];

// Fetch supported languages
export async function GET(request) {
  try {
    const response = await fetch(`${PISTON_API_URL}/api/v2/piston/runtimes`);
    const data = await response.json();

    // Define boilerplate code for major languages
    const boilerplateCode = {
      java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
      python: `print("Hello, World!")`,
      javascript: `console.log("Hello, World!");`,
      typescript: `let message: string = 'Hello, World!';
console.log(message);`,
      "c++": `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
      go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
      rust: `fn main() {
    println!("Hello, World!");
}`,
      php: `<?php
echo "Hello, World!";
?>`,
    };

    // Filter and map languages to include boilerplate code
    const languages = data
      .filter((lang) => MAJOR_LANGUAGES.includes(lang.language))
      .map((lang) => ({
        id: lang.language === "c++" ? "cpp" : lang.language,
        name: lang.language,
        version: lang.version,
        boilerplate: boilerplateCode[lang.language] || "",
      }));

    console.log(languages);

    return NextResponse.json(languages);
  } catch (error) {
    console.error("Error fetching languages:", error);
    return NextResponse.json(
      { error: "Failed to fetch languages." },
      { status: 500 }
    );
  }
}

// Compile and run code
export async function POST(request) {
  const { language, code, input, version } = await request.json();

  try {
    const response = await fetch(`${PISTON_API_URL}/api/v2/piston/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        version: version,
        files: [
          {
            content: code,
          },
        ],
        stdin: input,
      }),
    });

    const data = await response.json();
    return NextResponse.json({ output: data.run?.output || "No output." });
  } catch (error) {
    console.error("Error executing code:", error);
    return NextResponse.json(
      { output: "An error occurred during execution." },
      { status: 500 }
    );
  }
}
