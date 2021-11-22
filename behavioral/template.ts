type ApplicantStatus = "EXAM_PASSED" | "EXAM_FAILED";

interface ApplicantData {
  name: string;
  registeredAt: string;
  status: ApplicantStatus;
}

abstract class ApplicantDataMiner<T> {
  mine(dataWithDifferentFormat: T) {
    const jsonParsedData = this.convertToJSON(dataWithDifferentFormat);

    const registrationDistribution =
      this.getDistributionByRegistration(jsonParsedData);

    const statusDistribution = this.getDistributionByStatus(jsonParsedData);

    return { statusDistribution, registrationDistribution };
  }

  getDistributionByRegistration(data: ApplicantData[]) {}

  getDistributionByStatus(data: ApplicantData[]) {}

  convertToJSON(data: T): ApplicantData[] {
    throw new Error("convertToJSON is not implemented for DataMiner");
  }
}

type PdfDataType = any;

class ApplicantPdfDataMiner extends ApplicantDataMiner<PdfDataType> {
  override convertToJSON(data: PdfDataType) {
    // convert pdf to json
    return [];
  }
}

type XmlDataType = any;

class ApplicantXmlDataMiner extends ApplicantDataMiner<XmlDataType> {
  override convertToJSON(data: XmlDataType) {
    // convert xml to json
    return [];
  }
}

type CsvDataType = any;

class ApplicantCsvDataMiner extends ApplicantDataMiner<CsvDataType> {
  override convertToJSON(data: CsvDataType) {
    // convert csv to json
    return [];
  }
}

/**
 * Template method provides base abstract class which defined te architecture of subclasses
 * it allows the subclasses to override some of it's methods without changing architecture
 *
 * Template Pattern Pros
 *  * Subclasses override only those methods which they need.
 *  * Pull out the repeating code to the Template class.
 *
 * Template Pattern Cons
 *  * It works in class level, with inheritance, so it is static compared with Strategy Pattern which works with objects.
 *  * As Template grows it becomes harder to maintain.
 *  * Client did not get enough flexibility to alter Template.
 *  * Violating the Liskov Substitution Principle, subclasses of Template cannot be replaced by Template.
 *
 * Prefer Strategy Pattern over Template...
 */
