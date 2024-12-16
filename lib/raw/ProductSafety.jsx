import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function ProductSafety() {
  return (
    <div className="mt-[38px]">
      <div className="flex flex-col items-center justify-center bg-off-white py-[100px] lg:py-8 md:py-5 sm:py-4">
        <div className="mx-auto mb-1 flex w-full max-w-[1712px] flex-col items-center gap-[76px] px-14 lg:gap-[76px] lg:px-5 md:gap-[57px] md:px-5 sm:gap-[38px]">
          <Heading
            size="text-xl"
            as="h2"
            className="font-helveticaneue text-[64px] font-medium capitalize text-black-900 lg:text-[48px] md:text-[48px]"
          >
            How our products are harmless!
          </Heading>
          <div className="mt-1.5 self-stretch md:mt-0">
            <div>
              <div className="relative z-[4] ml-[52px] mr-[46px] flex items-center justify-between gap-5 md:mx-0 sm:flex-col">
                <img
                  src="img_hex_1.png"
                  width={162}
                  height={168}
                  alt="Hex Image One"
                  className="h-[168px] w-[16%] object-contain sm:w-full"
                />
                <img
                  src="img_hex_3.png"
                  width={162}
                  height={176}
                  alt="Hex Image Three"
                  className="h-[170px] w-[16%] object-contain sm:w-full"
                />
                <div className="h-[168px] w-[10%] rounded-[10px] bg-[url(/images/img_hex_5.png)] bg-cover bg-no-repeat px-[50px] py-[54px] lg:h-auto md:h-auto md:p-5 sm:w-full sm:p-4">
                  <img
                    src="img_rectangle_152.png"
                    width={66}
                    height={60}
                    alt="Rectangle Image"
                    className="mt-1.5 h-[60px] w-full object-cover lg:h-auto md:mt-0 md:h-auto"
                  />
                </div>
              </div>
              <div className="relative mt-[-44px] flex flex-col gap-[34px]">
                <div className="relative h-[192px] content-center lg:h-auto md:h-auto">
                  <div className="flex flex-1 items-center md:flex-col">
                    <div className="flex flex-1 items-start md:flex-col md:self-stretch">
                      <div className="flex flex-1 items-center md:flex-col md:self-stretch">
                        <div className="mb-3 flex w-[20%] flex-col items-center gap-0.5 self-end md:w-full">
                          <Heading
                            size="heading-md"
                            as="h3"
                            className="font-albragrotesktrial text-[36px] font-semibold tracking-[2.16px] text-black-900 lg:text-[30px] md:text-[30px] sm:text-[28px]"
                          >
                            Chemical Free
                          </Heading>
                          <Text
                            as="p"
                            className="self-stretch text-center font-helveticaneue text-[16px] font-normal leading-[19px] tracking-[0.96px] text-black-900 lg:text-[13px]"
                          >
                            We create the products which are chemical free.
                          </Text>
                        </div>
                        <div className="relative mt-[-64px] flex flex-1 items-start justify-center md:ml-0 md:flex-col md:self-stretch">
                          <div className="flex h-[72px] items-center bg-[url(/images/img_Group_5.svg)] bg-cover bg-no-repeat lg:h-auto md:h-auto">
                            <img
                              src="img_group_5.svg"
                              width={200}
                              height={72}
                              alt="Line Thirteen Image"
                              className="h-[72px] w-full lg:h-auto md:h-auto"
                            />
                          </div>
                          <div className="relative ml-[-20px] flex flex-1 flex-col items-end self-center md:ml-8 md:self-stretch">
                            <img
                              src="img_group_5.svg"
                              width={200}
                              height={72}
                              alt="Line Eleven Image"
                              className="relative z-[3] mt-[154px] h-[72px] w-[30%] object-contain md:mt-0"
                            />
                            <div className="relative mt-[-72px] flex flex-col self-stretch">
                              <img
                                src="img_Line_12.svg"
                                width={260}
                                height={72}
                                alt="Line Twelve Image"
                                className="mt-[142px] h-[72px] w-[28%] object-contain md:mt-0"
                              />
                              <div className="relative mt-[-46px] flex justify-between gap-5">
                                <img
                                  src="img_hex_2.png"
                                  width={162}
                                  height={168}
                                  alt="Hex Image Two"
                                  className="h-[168px] w-[20%] object-contain"
                                />
                                <div className="h-[168px] w-[20%] rounded-[16px] bg-[url(/images/img_hex_5.png)] bg-cover bg-no-repeat px-[56px] py-[54px] lg:h-auto md:h-auto md:p-5 sm:p-4">
                                  <img
                                    src="img_rectangle_152_66x60.png"
                                    width={60}
                                    height={66}
                                    alt="Square Image"
                                    className="mt-1.5 h-[60px] w-full object-cover lg:h-auto md:mt-0 md:h-auto"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <img
                          src="img_Line_12.svg"
                          width={200}
                          height={72}
                          alt="Line Fourteen Image"
                          className="relative ml-[-32px] h-[72px] w-[14%] object-contain md:mt-0 md:w-full"
                        />
                      </div>
                      <div className="relative mb-3 ml-[-58px] flex w-[16%] flex-col items-center gap-0.5 self-end md:mt-0 md:w-full">
                        <Heading
                          size="heading-md"
                          as="h3"
                          className="font-albragrotesktrial text-[36px] font-semibold tracking-[2.16px] text-black-900 lg:text-[30px] md:text-[30px] sm:text-[28px]"
                        >
                          No-GMO
                        </Heading>
                        <Text
                          as="p"
                          className="self-stretch text-center font-helveticaneue text-[16px] font-normal leading-[19px] tracking-[0.96px] text-black-900 lg:text-[13px]"
                        >
                          We create the products which are chemical free.
                        </Text>
                      </div>
                    </div>
                    <div className="absolute bottom-[10.84px] left-0 right-0 m-auto flex flex-1 flex-col items-center px-14 md:px-5 sm:px-4">
                      <Heading
                        size="heading-md"
                        as="h3"
                        className="font-albragrotesktrial text-[36px] font-semibold capitalize tracking-[2.16px] text-black-900 lg:text-[30px] md:text-[30px] sm:text-[28px]"
                      >
                        Safely tested
                      </Heading>
                      <Text
                        as="p"
                        className="w-[18%] text-center font-helveticaneue text-[16px] font-normal leading-[19px] tracking-[0.96px] text-black-900 lg:w-full lg:text-[13px] md:w-full"
                      >
                        We ensure our products are suitable for all.
                      </Text>
                    </div>
                  </div>
                  <div className="ml-[328px] mr-[316px] flex items-start md:mx-0 md:flex-col">
                    <div className="flex w-[48%] flex-col items-start gap-0.5 md:w-full">
                      <Heading
                        size="heading-md"
                        as="h6"
                        className="mt-1.5 font-albragrotesktrial text-[36px] font-semibold tracking-[2.16px] text-black-900 lg:text-[30px] md:mt-0 md:text-[30px] sm:text-[28px]"
                      >
                        Well Certified
                      </Heading>
                      <Text
                        as="p"
                        className="w-[58%] text-center font-helveticaneue text-[16px] font-normal leading-[19px] tracking-[0.96px] text-black-900 lg:w-full lg:text-[13px] md:w-full"
                      >
                        Our products are well verified and certified from FSSAI.
                      </Text>
                    </div>
                    <div className="flex flex-1 flex-col items-end gap-0.5 self-center md:self-stretch">
                      <Heading
                        size="heading-md"
                        as="h3"
                        className="font-albragrotesktrial text-[36px] font-semibold capitalize tracking-[2.16px] text-black-900 lg:text-[30px] md:text-[30px] sm:text-[28px]"
                      >
                        No preservatives
                      </Heading>
                      <Text
                        as="p"
                        className="w-[62%] text-center font-helveticaneue text-[16px] font-normal leading-[19px] tracking-[0.96px] text-black-900 lg:w-full lg:text-[13px] md:w-full"
                      >
                        We highly avoid using chemical preservatives; instead,
                        we use natural flavors.
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
