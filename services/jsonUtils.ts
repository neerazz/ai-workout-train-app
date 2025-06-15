export const cleanJsonString = (text: string): string => {
  // Remove ```json or ``` wrappers and any leading/trailing text
  return text.replace(/^```(?:json)?|```$/g, '').trim();
};
